import "../App";
import byteFoto from "../assets/byte.png";

function Home() {
  return (
    <>
      <div className="gradt h-screen w-screen noise relative overflow-hidden">
        <div className="absolute top-6 right-8 flex gap-4 z-20">
          <a href="/login" className="font-p bg-white/70 backdrop-blur-md hover:bg-white text-gray-800 px-6 py-2 rounded-full transition">
            Entrar
          </a>

          <a href="/register" className="font-p bg-gray-700/70 backdrop-blur-md hover:bg-gray-900 text-white px-6 py-2 rounded-full transition">
            Registrar
          </a>
        </div>

        <div className="h-full w-full flex items-center justify-center px-10">
          <div className="flex flex-col md:flex-row items-center gap-20 relative">
            <div className="shadow-box-custom bg-white/10 backdrop-blur-lg text-white font-p max-w-md p-8 rounded-3xl">
              <h2 className="text-lg mb-4">
                O que é a <span className="font-semibold">Byte Finance?</span>
              </h2>

              <p className="text-sm leading-relaxed text-gray-200">
                A <strong>Byte Finance</strong> é a sua nova ferramenta digital
                para o controle e gestão das suas finanças pessoais.
              </p>
            </div>

            <div
              className="top-30 relative shadow-box-custom bg-white/10 backdrop-blur-lg text-white font-p max-w-md p-8 rounded-3xl">
              <h2 className="text-lg mb-4">Como a Byte Finance te ajuda?</h2>

              <p className="text-sm leading-relaxed text-gray-200">
                Ele te ajuda a transformar seus hábitos financeiros. Chega de
                surpresas no final do mês! Com ele, você registra seus gastos
                rapidamente, ajudando você a planejar, economizar e alcançar
                seus objetivos financeiros.
              </p>

              <img
                src={byteFoto}
                alt="Byte Finance App"
                className="absolute -top-60 left-1/3 -translate-x-1/2 
                h-80 drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
