import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// ===== Só o ADMIN precisa de autenticação =====
const isAdminRoute = createRouteMatcher([
  "/admin(.*)",
  "/studio(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req)) {
    const { userId } = await auth();

    // Se não está autenticado, redireciona para sign-in
    if (!userId) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }
});

export const config = {
  matcher: [
    // Ignora ficheiros internos do Next.js e estáticos
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};