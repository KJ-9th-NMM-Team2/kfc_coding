import { useEffect, useRef } from "react";

export default function FestivalDetailMap({ location }) {
  // 맵 컨테이너를 참조할 useRef 훅
  const mapRef = useRef(null);
  // 지도 인스턴스를 저장할 useRef 훅
  const mapInstanceRef = useRef(null);
  // 현재 마커 인스턴스를 저장할 useRef 훅
  const markerRef = useRef(null);
  // 현재 인포윈도우 인스턴스를 저장할 useRef 훅
  const infowindowRef = useRef(null);

  console.log(location);

  // SDK 동적 로드 및 지도 초기화
  useEffect(() => {
    if (!mapRef.current) return;

    const KAKAO_MAP_API_KEY = import.meta.env.VITE_KAKAO_MAP;

    if (window.kakao && window.kakao.maps) {
      initializeMap();
      return;
    }

    const script = document.createElement("script");
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

  // location prop이 변경될 때마다 지도 업데이트
  useEffect(() => {
    if (!mapInstanceRef.current || !location) return;

    // 기존 마커와 인포윈도우 제거
    if (markerRef.current) {
      markerRef.current.setMap(null);
      markerRef.current = null;
    }
    if (infowindowRef.current) {
      infowindowRef.current.close();
      infowindowRef.current = null;
    }

    const geocoder = new window.kakao.maps.services.Geocoder();

    geocoder.addressSearch(location, function (result, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

        // 마커 생성
        const newMarker = new window.kakao.maps.Marker({
          map: mapInstanceRef.current,
          position: coords,
        });

        // 인포윈도우 생성 (content를 location 주소로 설정)
        const infowindow = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:5px;font-size:12px;">${location}</div>`,
        });

        // 마커에 마우스 오버 이벤트 리스너 추가
        window.kakao.maps.event.addListener(newMarker, "mouseover", () => {
          infowindow.open(mapInstanceRef.current, newMarker);
        });

        // 마커에 마우스 아웃 이벤트 리스너 추가
        window.kakao.maps.event.addListener(newMarker, "mouseout", () => {
          infowindow.close();
        });

        // 지도 중심 이동
        mapInstanceRef.current.setCenter(coords);

        // 생성된 마커와 인포윈도우 인스턴스 저장
        markerRef.current = newMarker;
        infowindowRef.current = infowindow;
      }
    });
  }, [location]);

  const initializeMap = () => {
    const container = mapRef.current;
    const options = {
      center: new window.kakao.maps.LatLng(37.5665, 126.978),
      level: 3,
    };
    const map = new window.kakao.maps.Map(container, options);
    mapInstanceRef.current = map;
  };

  return (
    <div
      ref={mapRef}
      style={{ width: "100%", height: "400px", borderRadius: "12px" }}
    ></div>
  );
}
