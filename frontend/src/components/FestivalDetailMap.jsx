import { useEffect, useRef } from 'react';

export default function FestivalDetailMap({ location }) {
    // 맵 컨테이너를 참조할 useRef 훅
    const mapRef = useRef(null);
    // 지도 인스턴스를 저장할 useRef 훅
    const mapInstanceRef = useRef(null);
    // 현재 마커 인스턴스를 저장할 useRef 훅
    const markerRef = useRef(null);
    // 현재 인포윈도우 인스턴스를 저장할 useRef 훅
    const infowindowRef = useRef(null);
    
    const cleanAddress = location.split(/[,(]/)[0].trim();
    console.log(cleanAddress);
    // SDK 동적 로드 및 지도 초기화
    useEffect(() => {
        if (!mapRef.current) return;

        const KAKAO_MAP_API_KEY = import.meta.env.VITE_KAKAO_MAP;

        if (window.kakao && window.kakao.maps) {
            initializeMap();
            return;
        }

        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;
        script.onload = () => {
            window.kakao.maps.load(() => {
                initializeMap();
            });
        };
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    const initializeMap = () => {
        const container = mapRef.current;
        const options = {
            center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 기본 서울 좌표
            level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);
        mapInstanceRef.current = map;

        // 지도 생성 후에 주소 검색 실행
        updateMap(cleanAddress);
    };

    // location prop이 변경될 때마다 지도 업데이트
    const updateMap = (address) => {
        if (!mapInstanceRef.current || !address) return;

        // 기존 마커 제거
        if (markerRef.current) {
            markerRef.current.setMap(null);
            markerRef.current = null;
        }
        if (infowindowRef.current) {
            infowindowRef.current.close();
            infowindowRef.current = null;
        }

        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch(address, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
                const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

                const newMarker = new window.kakao.maps.Marker({
                    map: mapInstanceRef.current,
                    position: coords,
                });

                const infowindow = new window.kakao.maps.InfoWindow({
                    content: `<div style="padding:5px;font-size:12px;">${address}</div>`,
                });

                window.kakao.maps.event.addListener(newMarker, 'mouseover', () => {
                    infowindow.open(mapInstanceRef.current, newMarker);
                });
                window.kakao.maps.event.addListener(newMarker, 'mouseout', () => {
                    infowindow.close();
                });

                mapInstanceRef.current.setCenter(coords);
                markerRef.current = newMarker;
                infowindowRef.current = infowindow;
            }
        });
    };

    return (
        <div
            ref={mapRef}
            style={{ width: "100%", height: "400px", borderRadius: "12px" }}
        ></div>
    );
}