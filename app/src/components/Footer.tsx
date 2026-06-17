
import { Github, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="w-full border-t border-[#222222] py-8 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-[0.8125rem] tracking-[0.02em] text-[#52525B]">
          &copy; 2026
        </span>
        <span className="text-[0.8125rem] tracking-[0.02em] text-[#52525B]">
          Designed &amp; built by Tanish Panwar
        </span>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/bvr4j"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#52525B] hover:text-[#FAFAFA] transition-colors duration-200"
            aria-label="GitHub"
          >
            <Github size={16} />
          </a>
          <a
            href="https://www.linkedin.com/in/tanish-panwar-706734381"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#52525B] hover:text-[#FAFAFA] transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
        </div>
      </div>
    </footer>
  )
}
