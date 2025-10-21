"use client";

import AutoScroll from "embla-carousel-auto-scroll";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface Logo {
  id: string;
  description: string;
  image?: string;
  svg?: React.ReactNode;
  className?: string;
}

interface PartnerLogosScrollerProps {
  heading?: string;
  logos?: Logo[];
}

const PartnerLogosScroller = ({
  heading = "Working With Industry Leaders",
  logos = [
    {
      id: "linkedin",
      description: "LinkedIn",
      image: "https://cdn.brandfetch.io/idJFz6sAsl/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1740371012427",
      className: "h-6 w-auto brightness-110",
    },
    {
      id: "make",
      description: "Make",
      image: "https://cdn.brandfetch.io/idVHU5hl7_/theme/light/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1690469455301",
      className: "h-6 w-auto brightness-125",
    },
    {
      id: "vapi",
      description: "Vapi",
      image: "https://cdn.brandfetch.io/idE43VOE0N/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1756323075130",
      className: "h-9 w-auto brightness-110",
    },
    {
      id: "retell",
      description: "Retell AI",
      image: "https://cdn.brandfetch.io/idVcdlV5xs/theme/light/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1722887941784",
      className: "h-6 w-auto brightness-110",
    },
    {
      id: "gohighlevel",
      description: "GoHighLevel",
      image: "https://cdn.brandfetch.io/idK-hvK7Lv/w/279/h/63/theme/light/logo.png?c=1bxid64Mup7aczewSAYMX&t=1692001848966",
      className: "h-6 w-auto brightness-125",
    },
    {
      id: "elevenlabs",
      description: "ElevenLabs",
      image: "https://cdn.brandfetch.io/idl_sWY35e/theme/light/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1741336812996",
      className: "h-6 w-auto brightness-110",
    },
    {
      id: "twilio",
      description: "Twilio",
      image: "https://www.vectorlogo.zone/logos/twilio/twilio-ar21.svg",
      className: "h-10 w-auto brightness-125",
    },
    {
      id: "voiceflow",
      description: "Voiceflow",
      image: "https://cdn.brandfetch.io/idO6_6uqJ9/idWtnk-fDo.svg?c=1bxid64Mup7aczewSAYMX&t=1655217297979",
      className: "h-6 w-auto brightness-125",
    },
    {
      id: "n8n",
      description: "n8n",
      image: "https://cdn.brandfetch.io/idI21jSfUY/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1759903379920",
      className: "h-7 w-auto brightness-110",
    },
    {
      id: "claude",
      description: "Claude",
      image: "https://mintlify.s3.us-west-1.amazonaws.com/anthropic/_generated/favicon/apple-touch-icon.png?v=3",
      className: "h-7 w-7 rounded brightness-110",
    },
    {
      id: "airtable",
      description: "Airtable",
      image: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Airtable_Logo.svg",
      className: "h-7 w-auto brightness-125",
    },
    {
      id: "gemini",
      description: "Google Gemini",
      image: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg",
      className: "h-7 w-auto brightness-110",
    },
    {
      id: "aws",
      description: "Amazon Web Services",
      image: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
      className: "h-7 w-auto brightness-125",
    },
    {
      id: "github",
      description: "GitHub",
      svg: (
        <div className="flex items-center gap-2">
          <svg className="h-6 w-6 brightness-110" viewBox="0 0 24 24" fill="white">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
          </svg>
          <span className="text-white font-semibold text-sm">GitHub</span>
        </div>
      ),
    },
    {
      id: "microsoft",
      description: "Microsoft",
      svg: (
        <div className="flex items-center gap-2">
          <svg className="h-6 w-6 brightness-110" viewBox="0 0 23 23" fill="none">
            <rect width="11" height="11" fill="#F25022"/>
            <rect x="12" width="11" height="11" fill="#7FBA00"/>
            <rect y="12" width="11" height="11" fill="#00A4EF"/>
            <rect x="12" y="12" width="11" height="11" fill="#FFB900"/>
          </svg>
          <span className="text-white font-semibold text-sm">Microsoft</span>
        </div>
      ),
    },
    {
      id: "chatgpt",
      description: "ChatGPT",
      svg: (
        <div className="flex items-center gap-2">
          <svg className="h-7 w-7 brightness-110" viewBox="0 0 24 24" fill="none">
            <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" fill="#10A37F"/>
          </svg>
          <span className="text-white font-semibold text-sm">ChatGPT</span>
        </div>
      ),
    },
    {
      id: "docker",
      description: "Docker",
      image: "https://www.vectorlogo.zone/logos/docker/docker-ar21.svg",
      className: "h-10 w-auto brightness-125",
    },
    {
      id: "stripe",
      description: "Stripe",
      image: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg",
      className: "h-7 w-auto brightness-125",
    },
  ],
}: PartnerLogosScrollerProps) => {
  return (
    <section className="py-4">
      <div className="container flex flex-col items-center text-center">
        <p className="text-base text-white mb-6 font-normal tracking-wide brightness-150">
          {heading}
        </p>
      </div>
      <div className="pt-2">
        <div className="relative mx-auto flex items-center justify-center lg:max-w-5xl">
          <Carousel
            opts={{ loop: true }}
            plugins={[AutoScroll({ playOnInit: true, speed: 0.3, stopOnInteraction: false, stopOnMouseEnter: true })]}
          >
            <CarouselContent className="ml-0" style={{ willChange: 'transform' }}>
              {logos.map((logo) => (
                <CarouselItem
                  key={logo.id}
                  className="flex basis-1/3 justify-center pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
                >
                  <div className="mx-3 sm:mx-6 md:mx-8 flex shrink-0 items-center justify-center opacity-90 hover:opacity-100 transition-opacity transform-gpu">
                    {logo.svg ? (
                      <div>{logo.svg}</div>
                    ) : logo.image ? (
                      <img
                        src={logo.image}
                        alt={logo.description}
                        className={logo.className}
                        loading="lazy"
                        decoding="async"
                      />
                    ) : null}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export { PartnerLogosScroller };
