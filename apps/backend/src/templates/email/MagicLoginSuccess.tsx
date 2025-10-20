import { APP_CONFIG } from '@/config/app.config'

export const MagicLinkEmail = ({ magicLink }: { magicLink: string }) => (
	<html lang="ru">
		<head>
			<meta />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<title>Войдите в аккаунт</title>
		</head>
		<body
			style={{
				fontFamily: 'system-ui, sans-serif',
				lineHeight: 1.6,
				color: '#1f2937',
				maxWidth: '600px',
				margin: '0 auto',
				padding: '20px',
			}}
		>
			<h2 style={{ color: '#111827' }}>Вход в аккаунт</h2>
			<p>Привет!</p>
			<p>
				Вы запросили вход в аккаунт на <strong>{APP_CONFIG.PROJECT_NAME}</strong>.
			</p>
			<p>Нажмите на кнопку ниже, чтобы войти без пароля:</p>
			<div style={{ textAlign: 'center', margin: '24px 0' }}>
				<a
					href={magicLink}
					style={{
						display: 'inline-block',
						padding: '12px 24px',
						backgroundColor: '#4f46e5',
						color: '#fff',
						textDecoration: 'none',
						borderRadius: '8px',
						fontWeight: '600',
					}}
				>
					Войти в аккаунт
				</a>
			</div>
			<p style={{ fontSize: '14px', color: '#6b7280' }}>
				Ссылка действительна <strong>15 минут</strong> и может быть использована{' '}
				<strong>только один раз</strong>.
			</p>
			<p style={{ fontSize: '14px', color: '#6b7280' }}>
				Если вы не запрашивали это письмо — просто проигнорируйте его.
			</p>
			<hr style={{ margin: '32px 0', borderColor: '#e5e7eb' }} />
			<p style={{ fontSize: '12px', color: '#9ca3af' }}>
				© {new Date().getFullYear()} ВашСервис. Все права защищены.
			</p>
		</body>
	</html>
)
