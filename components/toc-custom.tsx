"use client";

import { useTOCItems, TOCScrollArea } from "fumadocs-ui/components/toc";
import { TOCItems, TOCEmpty } from "fumadocs-ui/components/toc/default";
import { TOCItem as PrimitiveTOCItem } from "fumadocs-core/toc";
import { I18nLabel } from "fumadocs-ui/contexts/i18n";
import { cn } from "./cn";
import { Text } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import type { TOCItemType } from "fumadocs-core/toc";

/* ── Custom TOCItem with data-depth ────────────────── */
function CustomTOCItem({
  item,
  ...props
}: { item: TOCItemType } & ComponentProps<"a">) {
  return (
    <PrimitiveTOCItem
      href={item.url}
      data-depth={item.depth}
      {...props}
      className={cn(
        "toc-item py-1.5 text-sm text-fd-muted-foreground transition-colors wrap-anywhere first:pt-0 last:pb-0 data-[active=true]:text-fd-primary hover:text-fd-accent-foreground",
        props.className
      )}
    >
      {item.title}
    </PrimitiveTOCItem>
  );
}

/* ── Main custom TOC component ─────────────────────── */
export function CustomTOC({
  container,
  header,
  footer,
}: {
  container?: ComponentProps<"div">;
  header?: ReactNode;
  footer?: ReactNode;
}) {
  const items = useTOCItems();

  return (
    <div
      id="nd-toc"
      {...container}
      className={cn(
        "sticky top-(--fd-docs-row-1) h-[calc(var(--fd-docs-height)-var(--fd-docs-row-1))] flex flex-col [grid-area:toc] w-(--fd-toc-width) pt-12 pe-4 pb-2 xl:layout:[--fd-toc-width:268px] max-xl:hidden",
        container?.className
      )}
    >
      {header}
      <h3
        id="toc-title"
        className="inline-flex items-center gap-1.5 text-sm text-fd-muted-foreground"
      >
        <Text className="size-4" />
        <I18nLabel label="toc" />
      </h3>
      <TOCScrollArea>
        <TOCItems>
          {items.length === 0 && <TOCEmpty />}
          {items.map((item) => (
            <CustomTOCItem key={item.url} item={item} />
          ))}
        </TOCItems>
      </TOCScrollArea>
      {footer}
    </div>
  );
}
