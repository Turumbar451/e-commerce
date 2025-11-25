import { useState } from 'react';
import { requestPasswordReset } from '@/services/authServices';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function ForgotPassword() {
	const [email, setEmail] = useState('');
	const [submitted, setSubmitted] = useState(false);
	const [loading, setLoading] = useState(false);
	const [msg, setMsg] = useState('');
	const [messageVariant, setMessageVariant] = useState<'neutral' | 'success' | 'error'>('neutral');

	const messageColor =
		messageVariant === 'success'
			? 'text-emerald-600'
			: messageVariant === 'error'
				? 'text-destructive'
				: 'text-muted-foreground';

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!email) return;
		setLoading(true);
		setMsg('');
		setMessageVariant('neutral');
		try {
			await requestPasswordReset(email.trim());
			setSubmitted(true);
			setMessageVariant('success');
			setMsg('Si el correo existe, te hemos enviado un enlace para restablecer tu contraseña.');
		} catch (error) {
			console.error(error);
			setMessageVariant('error');
			setMsg('No se pudo procesar la solicitud. Intenta de nuevo más tarde.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-[60vh] flex items-center justify-center p-4">
			<Card className="w-full max-w-2xl">
				<CardHeader>
					<CardTitle>Recuperar contraseña</CardTitle>
					<CardDescription>
						Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					{!submitted ? (
						<form className="space-y-4 w-full" onSubmit={handleSubmit}>
							<div className="space-y-2">
								<Label htmlFor="forgot-email">Correo electrónico</Label>
								<Input
									id="forgot-email"
									type="email"
									className="w-full text-lg h-12"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="tu@correo.com"
									required
								/>
							</div>
							<Button type="submit" className="w-full" disabled={!email || loading}>
								{loading ? 'Enviando...' : 'Enviar enlace'}
							</Button>
						</form>
					) : (
						<div className="space-y-3 text-center">
							<p className="text-lg font-medium">Revisa tu correo</p>
							<p className="text-sm text-muted-foreground">
								Si el correo que ingresaste está registrado, recibirás un mensaje con un botón para
								restablecer tu contraseña. Haz clic en ese botón para continuar.
							</p>
						</div>
					)}

					{msg && <p className={`text-sm ${messageColor}`}>{msg}</p>}
				</CardContent>
			</Card>
		</div>
	);
}