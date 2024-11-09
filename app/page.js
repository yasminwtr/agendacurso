import Calendar from "./(pages)/agenda/page";

export default function Home() {
  return (
    <div className="background-page">
      <Calendar />

      {/* se vc quiser ver a sua tela de login sem usar rota, só descomenta o elemento abaixo e comenta o de calendario acima */}
      {/* <Login/> */}
    </div>
  );
}
