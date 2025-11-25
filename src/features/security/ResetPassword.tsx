import { useSearchParams } from 'react-router';
import { useState } from 'react';
import { resetPasswordWithToken } from '@/services/authServices';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { PasswordInput } from '@/components/common/PasswordInput';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  const token = searchParams.get('token') || '';

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [messageVariant, setMessageVariant] = useState<
    'neutral' | 'success' | 'error'
  >('neutral');

  const messageColor =
    messageVariant === 'success'
      ? 'text-emerald-600'
      : messageVariant === 'error'
      ? 'text-destructive'
      : 'text-muted-foreground';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !token) {
      setMessageVariant('error');
      setMsg('Enlace inválido o incompleto.');
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

    setLoading(true);
    setMsg('');
    setMessageVariant('neutral');
    try {
      await resetPasswordWithToken({ email, token, newPassword });
      setMessageVariant('success');
      setMsg(
        'Contraseña actualizada correctamente. Ahora puedes iniciar sesión.'
      );
    } catch (error) {
      console.error(error);
      setMessageVariant('error');
      setMsg(
        'No fue posible actualizar la contraseña. Es posible que el enlace haya expirado.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Restablecer contraseña</CardTitle>
          <CardDescription>
            Ingresa tu nueva contraseña para la cuenta asociada a este correo.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form className="space-y-4 w-full" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label>Correo</Label>
              <p className="text-sm text-muted-foreground break-all">
                {email || 'Correo no disponible en el enlace.'}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">Nueva contraseña</Label>
              <PasswordInput
                id="new-password"
                className="w-full"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirmar contraseña</Label>
              <PasswordInput
                id="confirm-password"
                className="w-full"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Actualizando...' : 'Cambiar contraseña'}
            </Button>
          </form>

          {msg && <p className={`text-sm ${messageColor}`}>{msg}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
