const Footer = () => {
  return (
    <footer className="mt-14 border-t border-white/10 py-8 text-sm text-slate-400">
      <p>
        Desenvolvido por{' '}
        <a
          href="https://nobredev.vercel.app/"
          target="_blank"
          rel="noreferrer"
          className="font-bold text-[#ffb3ba] underline decoration-[#ff4655]/60 underline-offset-4 transition-colors duration-200 hover:text-white"
        >
          Nobre Dev
        </a>
        . Dados fornecidos pela Valorant API.
      </p>
    </footer>
  );
};

export default Footer;
