import { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { setupSecurityQuestions, getSecurityCatalog } from '@/services/authServices';
import { GlobalContext } from '@/context/GlobalContext';

interface SelectedItem {
  id: string;
  answer: string;
}

export default function SecuritySetup() {
  const navigate = useNavigate();
  const { user, login } = useContext(GlobalContext);
  const [selected, setSelected] = useState<SelectedItem[]>([
    { id: '', answer: '' },
    { id: '', answer: '' },
  ]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
      return;
    }
    if (user.security?.enabled) {
      navigate('/', { replace: true });
      return;
    }
    // Prefill from localStorage if came from multi-step register
    try {
      const raw = localStorage.getItem(`pendingSecurity:${user.email}`);
      if (raw) {
        const arr = JSON.parse(raw) as Array<{ questionId: string; answer: string }>;
        if (Array.isArray(arr) && arr.length >= 2) {
          const mapped = arr.slice(0, 3).map((q) => ({ id: q.questionId, answer: q.answer }));
          setSelected(mapped as any);
        }
      }
    } catch {
      console.log("Local storage error")
    }
  }, [user, navigate]);

  const [catalog, setCatalog] = useState<Array<{ id: string; label: string }>>([]);
  useEffect(() => {
    let mounted = true;
    getSecurityCatalog()
      .then((list) => { if (mounted) setCatalog(list); })
      .catch(() => { if (mounted) setCatalog([]); });
    return () => { mounted = false; };
  }, []);

  const availableQuestions = useMemo(() => catalog, [catalog]);

  const updateQuestion = (idx: number, field: keyof SelectedItem, value: string) => {
    setSelected((prev) => {
      const draft = [...prev];
      draft[idx] = { ...draft[idx], [field]: value };
      return draft;
    });
  };

  const addQuestion = () => {
    setSelected((prev) => (prev.length < 3 ? [...prev, { id: '', answer: '' }] : prev));
  };

  const removeQuestion = (idx: number) => {
    setSelected((prev) => prev.filter((_, index) => index !== idx));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setMsg('');
    setLoading(true);
    try {
      const payload = selected
        .map((q) => ({
          questionId: q.id,
          answer: q.answer.trim(),
        }))
        .filter((q) => q.questionId && q.answer);

      if (payload.length < 2) {
        setMsg('Selecciona al menos 2 preguntas con su respuesta.');
        setLoading(false);
        return;
      }

      await setupSecurityQuestions(payload);
      toast.success('Preguntas configuradas.');

      // Clean pending prefill if exists
      try {
        localStorage.removeItem(`pendingSecurity:${user.email}`);
      } catch {
        console.log("Ola")
      }

      login({
        ...user,
        security: {
          enabled: true,
          questions: payload.map((q) => ({ questionId: q.questionId })),
        },
      });

      navigate('/', { replace: true });
    } catch (error: any) {
      console.error(error);
      setMsg(error?.response?.data?.error || 'No se pudieron configurar las preguntas.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Configurar preguntas de seguridad</CardTitle>
          <CardDescription>
            Necesitas registrar al menos dos preguntas para recuperar tu cuenta en caso de olvidar la contraseña.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={onSubmit}>
            {selected.map((q, idx) => (
              <div key={`question-${idx}`} className="space-y-2 rounded-lg border p-4">
                <div className="space-y-2">
                  <Label htmlFor={`question-${idx}`}>Pregunta #{idx + 1}</Label>
                  <select
                    id={`question-${idx}`}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={q.id}
                    onChange={(e) => updateQuestion(idx, 'id', e.target.value)}
                    required
                  >
                    <option value="">Selecciona una pregunta</option>
                    {availableQuestions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`answer-${idx}`}>Respuesta</Label>
                  <Input
                    id={`answer-${idx}`}
                    placeholder="Escribe tu respuesta"
                    value={q.answer}
                    onChange={(e) => updateQuestion(idx, 'answer', e.target.value)}
                    required
                  />
                </div>
                {selected.length > 2 && (
                  <div className="flex justify-end">
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeQuestion(idx)}>
                      Quitar
                    </Button>
                  </div>
                )}
              </div>
            ))}

            {selected.length < 3 && (
              <Button type="button" variant="outline" onClick={addQuestion}>
                Agregar otra pregunta
              </Button>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Guardando...' : 'Guardar preguntas'}
            </Button>
          </form>

          {msg && <p className="mt-4 text-sm text-destructive">{msg}</p>}
        </CardContent>
      </Card>
    </div>
  );
}