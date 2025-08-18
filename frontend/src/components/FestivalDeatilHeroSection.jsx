export default function FestivalDetailHeroSection({festival, festivalDates}) {
    const dateDiff = Date.parse(festival.end_date) - Date.now();
    const calLeftDays = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
    const leftDays = Date.parse(festival.start_date) > Date.now() 
            ? `D-${calLeftDays}` 
            : Date.parse(festival.end_date) < Date.now()
            ? "축제 종료"
            : "축제 진행 중"

    {/* Hero Section */ }
    return (
    <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-16">
            <div className="text-center">
                <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-6 inline-block">
                    <p className="text-lg">
                        {festival['short-description']}
                    </p>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    {festival.name}
                </h1>
                <div className="inline-block bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                    {leftDays}
                </div>
                <p className="text-xl md:text-2xl mb-8 text-gray-200">
                    {festivalDates}
                </p>
            </div>
        </div>
    </div>);
}
