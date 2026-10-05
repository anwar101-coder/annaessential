import * as Dialog from "@radix-ui/react-dialog";
import { MessageCircle, Phone, X } from "lucide-react";

import { Button } from "@/components/ui/button";

export function OrderDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-overlay backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in data-[state=closed]:fade-out" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 border border-border bg-background p-7 shadow-editorial sm:p-9">
          <div className="mb-7 flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow">Choose how to order</p>
              <Dialog.Title className="mt-2 font-display text-3xl text-foreground">We’re ready to help.</Dialog.Title>
              <Dialog.Description className="mt-3 text-sm leading-6 text-muted-foreground">
                Contact Anna Essentials directly through Telegram or by phone.
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <Button variant="icon" size="icon" aria-label="Close order options"><X className="size-4" /></Button>
            </Dialog.Close>
          </div>
          <div className="grid gap-3">
            <Button asChild variant="primary" className="w-full">
              <a href="https://t.me/teybahh" target="_blank" rel="noreferrer"><MessageCircle className="size-4" /> Order on Telegram</a>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <a href="tel:+251911346077"><Phone className="size-4" /> Call 0911 346 077</a>
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}