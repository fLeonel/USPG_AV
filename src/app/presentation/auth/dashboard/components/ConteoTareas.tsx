export default function ConteoTareas() {
  return (
    <div className="flex gap-10">
      {/* Tarjeta de tareas completadas */}
      <div className="bg-[#99b39a] rounded-2xl shadow-md px-16 py-8 text-center border-4 border-[#171717] min-w-[440px]">
        <p className="text-5xl font-bold text-[#171717]">1</p>
        <p className="text-md text-[#171717] mt-2">Tareas completadas</p>
      </div>

      {/* Tarjeta de tareas pendientes */}
      <div className="bg-[#99b39a] rounded-2xl shadow-md px-16 py-8 text-center border-4 border-[#171717] min-w-[440px]">
        <p className="text-5xl font-bold text-[#171717]">3</p>
        <p className="text-md text-[#171717] mt-2">Tareas pendientes</p>
      </div>
    </div>
  );
}
