import { useState } from 'react';
import {
  getSecurityQuestions,
  resetPasswordWithToken,
  verifySecurityAnswers,
} from '@/services/authServices';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PasswordInput } from '@/components/common/PasswordInput';

const CATALOG: Record<string, string> = {
  pet_name: 'Nombre de tu primera mascota',
  birth_city: 'Ciudad de nacimiento',
  first_school: 'Nombre de tu primera escuela',
};

interface QuestionItem {
  questionId: string;
}

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<1 | 2>(1);
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [msg, setMsg] = useState('');
  const [ok, setOk] = useState(false);
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [messageVariant, setMessageVariant] = useState<'neutral' | 'success' | 'error'>('neutral');

  const messageColor =
    messageVariant === 'success'
      ? 'text-emerald-600'
      : messageVariant === 'error'
        ? 'text-destructive'
        : 'text-muted-foreground';

  const loadQuestions = async () => {
    if (!email) return;
    setMsg('');
    setMessageVariant('neutral');
    setOk(false);
    setResetToken('');
    setNewPassword('');
    setConfirmPassword('');
    setIsLoadingQuestions(true);
    try {
      const res = await getSecurityQuestions(email.trim());
      setQuestions(res.questions || []);
      setAnswers({});
      setStep(2);
    } catch (error) {
      setMessageVariant('error');
      setMsg('No fue posible obtener las preguntas. Verifica el correo.');
      console.error(error);
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  const submitAnswers = async () => {
    if (!questions.length) return;
    setMsg('');
    setMessageVariant('neutral');
    setIsVerifying(true);
    try {
      const payload = questions.map((q) => ({
        questionId: q.questionId,
        answer: answers[q.questionId] || '',
      }));
      const res = await verifySecurityAnswers(email.trim(), payload);
      if (res.ok) {
        setOk(true);
        setResetToken(res.resetToken ?? res.token ?? '');
        setMessageVariant('success');
        setMsg('Respuestas correctas. Ahora puedes continuar con el reseteo de contraseña.');
      } else {
        setMessageVariant('error');
        setMsg('Respuestas incorrectas.');
      }
    } catch (error) {
      setMessageVariant('error');
      setMsg('Respuestas incorrectas o error de verificación.');
      console.error(error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResetPassword = async () => {
    if (!resetToken) {
      setMessageVariant('error');
      setMsg('Token de verificación inválido.');
      return;
    }
    if (!newPassword || newPassword.length < 8) {
      setMessageVariant('error');
      setMsg('La nueva contraseña debe tener al menos 8 caracteres.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessageVariant('error');
      setMsg('Las contraseñas no coinciden.');
      return;
    }
    setIsResetting(true);
    setMsg('');
    setMessageVariant('neutral');
    try {
      await resetPasswordWithToken({
        email: email.trim(),
        token: resetToken,
        newPassword,
      });
      setMessageVariant('success');
      setMsg('Contraseña actualizada correctamente. Ahora puedes iniciar sesión.');
    } catch (error) {
      setMessageVariant('error');
      setMsg('No fue posible actualizar la contraseña. Intenta nuevamente.');
      console.error(error);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Recuperar contraseña</CardTitle>
          <CardDescription>
            Ingresa tu correo y responde tus preguntas de seguridad para continuar.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 1 && (
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                loadQuestions();
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="forgot-email">Correo electrónico</Label>
                <Input
                  id="forgot-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  type="email"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={!email || isLoadingQuestions}>
                {isLoadingQuestions ? 'Buscando preguntas...' : 'Continuar'}
              </Button>
            </form>
          )}

          {step === 2 && (
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                submitAnswers();
              }}
            >
              {questions.map((q) => (
                <div key={q.questionId} className="space-y-2">
                  <Label>{CATALOG[q.questionId] || q.questionId}</Label>
                  <Input
                    value={answers[q.questionId] || ''}
                    onChange={(e) => setAnswers((a) => ({ ...a, [q.questionId]: e.target.value }))}
                    placeholder="Respuesta"
                    required
                  />
                </div>
              ))}
              <Button type="submit" className="w-full" disabled={isVerifying}>
                {isVerifying ? 'Verificando...' : 'Verificar respuestas'}
              </Button>
            </form>
          )}

          {ok && (
            <form
              className="space-y-4 border-t pt-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleResetPassword();
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="new-password">Nueva contraseña</Label>
                <PasswordInput
                  id="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar contraseña</Label>
                <PasswordInput
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isResetting}>
                {isResetting ? 'Actualizando...' : 'Cambiar contraseña'}
              </Button>
            </form>
          )}

          {msg && <p className={`text-sm ${messageColor}`}>{msg}</p>}
        </CardContent>
      </Card>
    </div>
  );
}