declare module 'next' {
  export type Metadata = any;
  export type Viewport = any;
  export namespace MetadataRoute {
    export type Sitemap = any;
    export type Robots = any;
  }
}

declare module 'next/font/google' {
  export function Sora(options: any): any;
}

declare module 'next/link' {
  import React from 'react';
  const Link: React.ComponentType<any>;
  export default Link;
}

declare module 'next/image' {
  import React from 'react';
  const Image: React.ComponentType<any>;
  export default Image;
}

declare module 'next/dist/lib/metadata/types/metadata-interface.js' {
  export type ResolvingMetadata = Promise<any>;
  export type ResolvingViewport = Promise<any>;
}

declare module 'next/types.js' {
  export type ResolvingMetadata = Promise<any>;
  export type ResolvingViewport = Promise<any>;
}

declare module '@tabler/icons-react' {
  import React from 'react';
  export interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
    stroke?: number | string;
    color?: string;
  }
  export const IconBrandDiscord: React.ComponentType<IconProps>;
  export const IconBrandLinkedin: React.ComponentType<IconProps>;
  export const IconBrandX: React.ComponentType<IconProps>;
  export const IconBrandInstagram: React.ComponentType<IconProps>;
  export const IconMenu2: React.ComponentType<IconProps>;
  export const IconX: React.ComponentType<IconProps>;
  export const IconArrowRight: React.ComponentType<IconProps>;
  export const IconArrowUpRight: React.ComponentType<IconProps>;
  export const IconCheck: React.ComponentType<IconProps>;
  export const IconSparkles: React.ComponentType<IconProps>;
  export const IconDoorEnter: React.ComponentType<IconProps>;
  export const IconCode: React.ComponentType<IconProps>;
  export const IconEyeCheck: React.ComponentType<IconProps>;
  export const IconMessageHeart: React.ComponentType<IconProps>;
  export const IconShieldCheck: React.ComponentType<IconProps>;
  export const IconBriefcase: React.ComponentType<IconProps>;
  export const IconGitPullRequest: React.ComponentType<IconProps>;
  export const IconSend: React.ComponentType<IconProps>;
  export const IconUsers: React.ComponentType<IconProps>;
  export const IconQuote: React.ComponentType<IconProps>;
  export const IconTrophy: React.ComponentType<IconProps>;
  export const IconCodeAsterisk: React.ComponentType<IconProps>;
  export const IconGavel: React.ComponentType<IconProps>;
  export const IconRocket: React.ComponentType<IconProps>;
  export const IconMessage2: React.ComponentType<IconProps>;
  export const IconBriefcase2: React.ComponentType<IconProps>;
  export const IconCodeDots: React.ComponentType<IconProps>;
  export const IconHash: React.ComponentType<IconProps>;
  export const IconCircleCheck: React.ComponentType<IconProps>;
  export const IconCalendar: React.ComponentType<IconProps>;
  export const IconMail: React.ComponentType<IconProps>;
  export const IconLock: React.ComponentType<IconProps>;
}
