import { NextRequest, NextResponse } from "next/server";
import { subscribeToNewsletter } from "@/actions/subscriptionActions";
import { sendMail } from "@/lib/emailService";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "O e-mail é obrigatório" },
        { status: 400 }
      );
    }

    const ipAddress =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    const result = await subscribeToNewsletter({
      email,
      source: "footer",
      ipAddress,
      userAgent,
    });

    if (!result.success) {
      return NextResponse.json(
        {
          error: result.message,
          alreadySubscribed: result.alreadySubscribed || false,
        },
        { status: result.alreadySubscribed ? 200 : 400 }
      );
    }

    // Enviar email de boas-vindas
    const emailResult = await sendMail({
      email,
      subject: "Bem-vindo à Newsletter da E.D.S TECH! 🎉",
      text: `Obrigado por subscrever à nossa newsletter! Agora faz parte da nossa comunidade exclusiva.`,
      html: generateWelcomeEmailHTML(email),
    });

    if (!emailResult.success) {
      console.error("Falha ao enviar email de boas-vindas:", emailResult.error);
    }

    return NextResponse.json(
      {
        message: result.message,
        subscriptionId: result.data?.subscriptionId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro na API de subscrição da newsletter:", error);
    return NextResponse.json(
      { error: "Algo correu mal. Tente novamente mais tarde." },
      { status: 500 }
    );
  }
}

// Email HTML com identidade E.D.S TECH
function generateWelcomeEmailHTML(email: string): string {
  return `
<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bem-vindo à Newsletter da E.D.S TECH</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8f8fb;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #2d2a7d 0%, #e30613 100%);
            color: white;
            padding: 40px 20px;
            text-align: center;
        }
        .header h1 {
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 10px;
        }
        .header p { font-size: 18px; opacity: 0.95; }
        .content { padding: 40px 30px; }
        .welcome-message { text-align: center; margin-bottom: 30px; }
        .welcome-message h2 {
            color: #2d2a7d;
            font-size: 28px;
            margin-bottom: 15px;
        }
        .welcome-message p {
            color: #495057;
            font-size: 16px;
            line-height: 1.8;
        }
        .benefits {
            background: linear-gradient(135deg, #f8f8fb 0%, #eef1f9 100%);
            border-radius: 12px;
            padding: 30px;
            margin: 30px 0;
            border: 1px solid #dee2e6;
        }
        .benefits h3 {
            color: #2d2a7d;
            font-size: 22px;
            margin-bottom: 20px;
            text-align: center;
        }
        .benefit-item {
            display: flex;
            align-items: flex-start;
            margin-bottom: 20px;
            padding: 15px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        .benefit-icon {
            font-size: 24px;
            margin-right: 15px;
            min-width: 30px;
        }
        .benefit-text h4 {
            color: #2d2a7d;
            font-size: 16px;
            margin-bottom: 5px;
        }
        .benefit-text p {
            color: #6c757d;
            font-size: 14px;
            line-height: 1.6;
        }
        .cta-section { text-align: center; margin: 40px 0; }
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #2d2a7d 0%, #e30613 100%);
            color: white;
            padding: 15px 40px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            box-shadow: 0 4px 8px rgba(45, 42, 125, 0.3);
        }
        .social-proof {
            background: linear-gradient(135deg, #eef1f9 0%, #fce5e8 100%);
            border-radius: 12px;
            padding: 25px;
            margin: 30px 0;
            text-align: center;
            border: 1px solid #e6e9f5;
        }
        .social-proof h3 {
            color: #2d2a7d;
            font-size: 20px;
            margin-bottom: 10px;
        }
        .social-proof p { color: #555; font-size: 14px; }
        .footer {
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2a7d 100%);
            color: #ffffff;
            padding: 40px 20px;
            text-align: center;
            border-top: 4px solid #e30613;
        }
        .footer p {
            margin-bottom: 15px;
            opacity: 0.9;
            font-size: 14px;
        }
        .footer a { color: #ffffff; text-decoration: none; opacity: 0.8; }
        .social-links { margin-top: 20px; }
        .social-links a { margin: 0 10px; }
        .unsubscribe { margin-top: 20px; font-size: 12px; opacity: 0.7; }
        @media (max-width: 600px) {
            .header, .content, .footer { padding: 20px 15px; }
            .benefits { padding: 20px 15px; }
            .benefit-item { flex-direction: column; text-align: center; }
            .benefit-icon { margin: 0 0 10px 0; }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>🎉 Bem-vindo à E.D.S TECH!</h1>
            <p>Obrigado por subscrever à nossa newsletter</p>
        </div>

        <!-- Main Content -->
        <div class="content">
            <div class="welcome-message">
                <h2>Está Tudo Pronto! 🌟</h2>
                <p>
                    Obrigado por subscrever à newsletter da E.D.S TECH! Estamos muito contentes por ter você como parte da nossa comunidade.
                    Prepare-se para receber dicas técnicas, novidades e ofertas exclusivas diretamente no seu e-mail.
                </p>
            </div>

            <!-- Benefits -->
            <div class="benefits">
                <h3>O Que Vai Receber Como Subscritor</h3>

                <div class="benefit-item">
                    <div class="benefit-icon">🎁</div>
                    <div class="benefit-text">
                        <h4>Ofertas & Descontos Exclusivos</h4>
                        <p>Seja o primeiro a saber sobre promoções especiais e descontos exclusivos para subscritores.</p>
                    </div>
                </div>

                <div class="benefit-item">
                    <div class="benefit-icon">🚀</div>
                    <div class="benefit-text">
                        <h4>Acesso Antecipado a Novos Serviços</h4>
                        <p>Conheça em primeira mão os novos serviços e soluções técnicas da E.D.S TECH.</p>
                    </div>
                </div>

                <div class="benefit-item">
                    <div class="benefit-icon">💡</div>
                    <div class="benefit-text">
                        <h4>Dicas Técnicas & Tutoriais</h4>
                        <p>Fique atualizado com dicas de manutenção, tutoriais e novidades do setor.</p>
                    </div>
                </div>

                <div class="benefit-item">
                    <div class="benefit-icon">🛠️</div>
                    <div class="benefit-text">
                        <h4>Suporte Prioritário</h4>
                        <p>Atendimento rápido e prioritário para subscritores da newsletter.</p>
                    </div>
                </div>

                <div class="benefit-item">
                    <div class="benefit-icon">🎂</div>
                    <div class="benefit-text">
                        <h4>Promoções de Aniversário</h4>
                        <p>Receba descontos especiais para celebrar o seu aniversário connosco!</p>
                    </div>
                </div>
            </div>

            <!-- CTA -->
            <div class="cta-section">
                <p style="margin-bottom: 20px; color: #495057;">Explore os nossos serviços hoje mesmo!</p>
                <a href="${process.env.NEXT_PUBLIC_BASE_URL || "https://edstech.co.mz"}/shop" class="cta-button">
                    Ver Serviços →
                </a>
            </div>

            <!-- Social Proof -->
            <div class="social-proof">
                <h3>Junte-se a Centenas de Clientes Satisfeitos!</h3>
                <p>Agora faz parte da nossa comunidade de clientes que confiam na E.D.S TECH.</p>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p><strong>E.D.S TECHNOLOGY LDA</strong></p>
            <p>Engenharia • Tecnologia • Soluções<br>
               Matola, Av. da Liberdade, nº 323<br>
               Moçambique</p>
            <p>
                Dúvidas? Contacte-nos em
                <a href="mailto:edstechnology@tvcabo.co.mz">edstechnology@tvcabo.co.mz</a> ou
                <a href="tel:+258844974637">+258 84 497 4637</a>
            </p>

            <div class="social-links">
                <a href="https://www.facebook.com/edstech">Facebook</a> |
                <a href="https://www.instagram.com/edstech">Instagram</a> |
                <a href="https://wa.me/258844974637">WhatsApp</a>
            </div>

            <div class="unsubscribe">
                <p>
                    Recebeu este e-mail porque subscreveu à Newsletter da E.D.S TECH com ${email}.<br>
                    <a href="${process.env.NEXT_PUBLIC_BASE_URL || "https://edstech.co.mz"}/unsubscribe?email=${encodeURIComponent(email)}">
                        Cancelar Subscrição
                    </a>
                </p>
            </div>
        </div>
    </div>
</body>
</html>
  `;
}