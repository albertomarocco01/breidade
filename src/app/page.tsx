import { getDictionary, getLocale } from "@/lib/i18n";
import { Gate } from "@/components/gate/Gate";

// GATE (/) — the entrance, the fork into Giulia's two souls. The visual + motion
// build lives in <Gate> (a Client Component); this server page resolves the
// locale and hands the dictionary down.
export default async function GatePage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  return <Gate dict={dict} />;
}
