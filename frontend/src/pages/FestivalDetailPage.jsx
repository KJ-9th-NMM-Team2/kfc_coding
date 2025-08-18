import React from 'react';
import festivalDetailMock from '../mock/festivalDetail.json'
import FestivalDetailHeroSection from '../components/FestivalDeatilHeroSection.jsx'
import FestivalDetailDesc from "../components/FestivalDetailDesc.jsx"
import FestivalDeatilCard from "../components/FestivalDeatilCard.jsx"
import FestivalDeatilSocialLinkCard from "../components/FestivalDeatilSocialLinkCard.jsx"
import FestivalContactInfoCard from "../components/FesitvalContactInfoCard.jsx"

// React Bootstrap을 CDN으로 시뮬레이트 (Tailwind CSS로 구현)
const FestivalDetail = () => {
    // 첫 번째 축제 데이터를 사용한다고 가정
    const festival = festivalDetailMock[0];
    
    const festivalDates = festival ? [`${festival.start_date} ~ ${festival.end_date}`] : [];
    
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation Bar */}
            <h1>(헤더)</h1>
            <nav className="bg-white shadow-sm border-b">
                <div className="max-w-6xl mx-auto px-4 py-3">
                    <div className="flex justify-between items-center">
                        <div className="text-xl font-bold text-blue-600">대한민국 구석구석</div>
                        <div className="flex space-x-6 text-sm text-gray-600">
                            &nbsp;&nbsp;&nbsp;
                            <span>지역축제</span>&nbsp;&nbsp;&nbsp;
                            <span>문화유산</span>&nbsp;&nbsp;&nbsp;
                            <span>관광정보</span>
                            <p>
                                {/* {festival.start_date } */}
                            </p>
                        </div>
                    </div>
                </div>
            </nav>

            
            {/* 바디 - 나중에 삭제 해도 됨 part 구분 때문에 해둠 */}
            <h1>(바디)</h1>

            {/* 축제 히로 섹션 - 뭔지 잘 모르겠지만 일단 넣음 */ }
            <FestivalDetailHeroSection festival={festival} festivalDates={festivalDates}/>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid md:grid-cols-3 gap-8">

                    {/* 축제 소개 */ }
                    <FestivalDetailDesc />

                    {/* Right Column - Festival Info */}
                    <div className="space-y-6">

                        {/* Festival Details Card */}
                        <FestivalDeatilCard />

                        {/* Social & Links Card */}
                        <FestivalDeatilSocialLinkCard />

                        {/* Contact Info Card */}
                        <FestivalContactInfoCard />
                    </div>
                </div>
            </div>

            <h1>(푸터)</h1>
            {/* Footer */}
            <footer className="bg-gray-800 text-white py-8">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <p className="mb-2">군산 국가유산 야행과 함께하는 특별한 여름밤</p>
                    <p className="text-gray-400 text-sm">
                        문화유산과 현대가 어우러진 독특한 경험을 선사합니다
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default FestivalDetail;