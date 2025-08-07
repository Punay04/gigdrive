"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Cloud,
  ShieldCheck,
  Folder,
  Link2,
  Rocket,
  Smartphone,
  ArrowRight,
} from "lucide-react";
import { useStore } from "@/zustand/store";

export default function LandingPage() {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const logout = useStore((state) => state.logout);
  return (
    <main className="min-h-dvh bg-neutral-900 text-foreground">
      <header className="sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-neutral-900/60 border-b border-border/60">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative size-8">
              <Image
                src="/logo.png"
                alt="GigDrive logo"
                fill
                sizes="32px"
                className="object-contain"
                priority
              />
            </div>
            <span className="text-xl font-semibold tracking-tight">
              GigDrive
            </span>
          </Link>

          <nav className="flex items-center gap-2">
            <Button asChild variant="ghost" className="hidden sm:inline-flex">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button asChild variant="destructive" className="font-semibold">
              <Link href="/auth" className="flex items-center gap-2">
                Get Started <ArrowRight className="size-4" />
              </Link>
            </Button>
            {isLoggedIn && (
              <Button className="cursor-pointer" onClick={() => logout()}>
                Logout
              </Button>
            )}
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(75rem_40rem_at_50%_-10rem,oklch(0.269_0_0/.25),transparent_60%)]" />
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24 lg:py-28">
          <div className="grid items-center gap-10 sm:gap-16 lg:grid-cols-2">
            <div className="space-y-6">
              <h1 className="text-4xl/tight font-bold tracking-tight sm:text-5xl/tight">
                The unlimited cloud storage
                <span className="block bg-gradient-to-r from-red-300 to-red-400 bg-clip-text text-transparent">
                  powered by Telegram
                </span>
              </h1>
              <p className="text-base text-muted-foreground sm:text-lg">
                Upload, organize, and share files effortlessly. GigDrive sends
                your files straight to Telegram for fast and reliable
                centralized storage in our account.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  asChild
                  variant="destructive"
                  className="px-6 py-5 text-base font-semibold"
                >
                  <Link href="/auth" className="flex items-center gap-2">
                    Start free <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="secondary"
                  className="px-6 py-5 text-base"
                >
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl rounded-3xl border border-border/70 bg-gradient-to-br from-neutral-900/80 via-neutral-800/70 to-neutral-900/80 p-5 sm:p-6 lg:p-8 shadow-2xl">
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <FeatureCard
                  icon={<Cloud className="size-5" />}
                  title="Unlimited by design"
                  desc="Backed by Telegram’s CDN for massive files."
                />
                <FeatureCard
                  icon={<ShieldCheck className="size-5" />}
                  title="Centralized storage"
                  desc="Files are stored in our Telegram account via the bot."
                />
                <FeatureCard
                  icon={<Folder className="size-5" />}
                  title="Organized folders"
                  desc="Create folders and keep things tidy."
                />
                <FeatureCard
                  icon={<Link2 className="size-5" />}
                  title="Share in 1 click"
                  desc="Copy links and share instantly."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <div className="mx-auto max-w-3xl rounded-2xl border border-border/60 bg-neutral-900/60 p-6 sm:p-8">
            <h3 className="text-lg font-semibold">Transparency notice</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              GigDrive is not private storage. All uploaded files are stored in
              our Telegram account through the GigDrive bot. Admins may access
              these files. Please avoid uploading sensitive or confidential
              information.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              How GigDrive works
            </h2>
            <p className="mt-3 text-muted-foreground">
              Three simple steps to start storing without limits.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <StepCard
              icon={<Smartphone className="size-5" />}
              step="1"
              title="Sign in with Telegram"
              desc="Authenticate securely using your Telegram account."
            />
            <StepCard
              icon={<Folder className="size-5" />}
              step="2"
              title="Create a folder"
              desc="Organize your files by project or purpose."
            />
            <StepCard
              icon={<Rocket className="size-5" />}
              step="3"
              title="Upload & share"
              desc="Send files to Telegram and share links anywhere."
            />
          </div>

          <div className="mt-12 flex justify-center">
            <Button
              asChild
              variant="destructive"
              className="px-6 py-5 text-base font-semibold"
            >
              <Link href="/auth" className="flex items-center gap-2">
                Get started now <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} GigDrive. All rights reserved ·
            Developed by
            <span className="ml-1 font-medium text-foreground">
              Punay Kukreja
            </span>
          </p>
          <div className="flex items-center gap-4">
            {isLoggedIn && (
              <div
                className="cursor-pointer hover:text-foreground"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </div>
            )}
            {!isLoggedIn && (
              <Link href="/auth" className="hover:text-foreground">
                Sign in
              </Link>
            )}
            <Link href="/dashboard" className="hover:text-foreground">
              Dashboard
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-neutral-900/60 p-4 shadow-sm">
      <div className="mb-2 inline-flex size-9 items-center justify-center rounded-xl border border-red-300/30 bg-red-300/10 text-red-300">
        {icon}
      </div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}

function StepCard({
  icon,
  step,
  title,
  desc,
}: {
  icon: React.ReactNode;
  step: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-neutral-900/80 via-neutral-800/70 to-neutral-900/80 p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="inline-flex size-9 items-center justify-center rounded-xl border border-red-300/30 bg-red-300/10 text-red-300">
          {icon}
        </div>
        <span className="text-xs font-semibold tracking-wide text-muted-foreground">
          STEP {step}
        </span>
      </div>
      <h3 className="mt-3 text-base font-semibold leading-tight">{title}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}
