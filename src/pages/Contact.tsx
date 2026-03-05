import { Mail } from "lucide-react";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

const OFFICIAL_EMAIL = "support@noir-demo.cn";

export default function Contact() {
  const onSend = () => {
    const subject = encodeURIComponent("联系客服｜NOIR Womenswear");
    const body = encodeURIComponent("请在此填写你的问题与订单号（如有）：\n\n");
    window.location.href = `mailto:${OFFICIAL_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <Container size="sm" className="py-10">
      <div className="rounded-2xl border border-border bg-bg/70 p-8 shadow-soft backdrop-blur">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="font-display text-3xl tracking-wide text-fg">Contact</div>
            <div className="mt-2 text-sm text-muted">我们优先通过邮件为你提供支持。</div>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-white/60">
            <Mail className="h-5 w-5 text-navy/80" />
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-border bg-white/40 p-4 text-sm">
          <div className="text-xs tracking-wide text-muted">官方邮箱</div>
          <div className="mt-1 font-medium tracking-wide text-fg">{OFFICIAL_EMAIL}</div>
        </div>

        <div className="mt-6">
          <Button size="lg" onClick={onSend}>
            发送邮件
          </Button>
        </div>
      </div>
    </Container>
  );
}

