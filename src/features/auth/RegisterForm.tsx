import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, Chrome } from 'lucide-react';
import { Link } from 'react-router';
import { PasswordInput } from '@/components/common/PasswordInput';
import { useRegisterForm } from './hooks/useRegisterForm';
import { getSecurityCatalog } from '@/services/authServices';

export function RegisterForm() {
  const {
    name,
    email,
    password,
    confirmPassword,
    error,
    apellido,

    isLoading,
    setApellido,
    setName,
    setEmail,
    setPassword,
    setConfirmPassword,
    handleSubmit,
  } = useRegisterForm();

  const [step, setStep] = useState<1 | 2>(1);
  const [questions, setQuestions] = useState<{ id: string; answer: string }[]>([
    { id: '', answer: '' },
    { id: '', answer: '' },
  ]);

  const [catalog, setCatalog] = useState<Array<{ id: string; label: string }>>([]);
  useEffect(() => {
    let mounted = true;
    getSecurityCatalog()
      .then((list) => { if (mounted) setCatalog(list); })
      .catch(() => { if (mounted) setCatalog([]); });
    return () => { mounted = false; };
  }, []);

  const availableQuestions = useMemo(() => catalog, [catalog]);

  const updateQuestion = (idx: number, field: 'id' | 'answer', value: string) => {
    setQuestions((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: value };
      return copy;
    });
  };

  const addQuestion = () => {
    setQuestions((prev) => (prev.length < 3 ? [...prev, { id: '', answer: '' }] : prev));
  };

  const removeQuestion = (idx: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== idx));
  };

  const submitStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const submitAll = (e: React.FormEvent) => {
    const payload = questions
      .map((q) => ({ questionId: q.id, answer: q.answer.trim() }))
      .filter((q) => q.questionId && q.answer);
    handleSubmit(e, payload);
  };

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Crear cuenta</CardTitle>
        <CardDescription>Completa tus datos para unirte.</CardDescription>
      </CardHeader>
      <CardContent>
        {step === 1 && (
          <form onSubmit={submitStep1}>
            <div className="grid w-full items-center gap-6">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  placeholder="Nombre"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="apellido">Apellido</Label>
                <Input
                  id="apellido"
                  placeholder="Apellido"
                  required
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                />
              </div>

              <div className="flex flex-col space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@correo.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex flex-col space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <PasswordInput
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex flex-col space-y-2">
                <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                <PasswordInput
                  id="confirmPassword"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                {error && (
                  <div className="flex items-center text-sm text-destructive">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    <span>{error}</span>
                  </div>
                )}
              </div>

              <Button type="submit" className="w-full font-semibold" disabled={isLoading}>
                Siguiente
              </Button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={submitAll} className="space-y-6">
            {questions.map((q, idx) => (
              <div key={idx} className="space-y-2 rounded-lg border p-4">
                <div className="space-y-2">
                  <Label>Pregunta #{idx + 1}</Label>
                  <select
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={q.id}
                    onChange={(e) => updateQuestion(idx, 'id', e.target.value)}
                    required
                  >
                    <option value="">Selecciona una pregunta</option>
                    {availableQuestions.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Respuesta</Label>
                  <Input
                    placeholder="Escribe tu respuesta"
                    value={q.answer}
                    onChange={(e) => updateQuestion(idx, 'answer', e.target.value)}
                    required
                  />
                </div>
                {questions.length > 2 && (
                  <div className="flex justify-end">
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeQuestion(idx)}>
                      Quitar
                    </Button>
                  </div>
                )}
              </div>
            ))}

            {questions.length < 3 && (
              <Button type="button" variant="outline" onClick={addQuestion}>
                Agregar otra pregunta
              </Button>
            )}

            <div className="flex gap-3">
              <Button type="button" variant="secondary" onClick={() => setStep(1)}>
                Atrás
              </Button>
              <Button type="submit" className="flex-1" disabled={isLoading}>
                {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
              </Button>
            </div>
          </form>
        )}

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">O</span>
          </div>
        </div>

        <Button variant="outline" className="w-full cursor-pointer ">
          <Chrome className="mr-2 h-4 w-4" />
          Continuar con Google
        </Button>
      </CardContent>

      <CardFooter className="flex justify-center text-sm">
        <span className="text-muted-foreground">¿Ya tienes una cuenta?</span>
        <Link
          to="/login"
          className="font-semibold text-primary hover:underline ml-1"
        >
          Iniciar sesión
        </Link>
      </CardFooter>
    </Card>
  );
}
