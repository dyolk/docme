import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { ImageZoom } from 'fumadocs-ui/components/image-zoom';
import type { ImageZoomProps } from 'fumadocs-ui/components/image-zoom';
import { Mermaid } from '@/components/mermaid';
import { Banner } from 'fumadocs-ui/components/banner';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import { File, Folder, Files } from 'fumadocs-ui/components/files';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    img: (props: React.ComponentProps<'img'>) => (
      <ImageZoom {...(props as ImageZoomProps)} />
    ),
    Mermaid,
    Banner,
    Accordion,
    Accordions,
    File,
    Folder,
    Files,
    Step,
    Steps,
    Tab,
    Tabs,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
