const Hapi = require('@hapi/hapi');

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
    });

    // Fungsi untuk menentukan string AQI
    const getAQIString = (aqi) => {
        if (aqi <= 50) return 'good';
        if (aqi <= 100) return 'moderate';
        if (aqi <= 150) return 'unhealthy for sensitive groups';
        if (aqi <= 200) return 'unhealthy';
        if (aqi <= 300) return 'very unhealthy';
        return 'hazardous';
    };

    // Fungsi untuk menentukan URL gambar cuaca
    const getWeatherImage = (degreeImg) => {
        const weatherImages = {
            cerah: 'http://example.com/cerah.png',
            berawan: 'http://example.com/berawan.png',
            hujan: 'http://example.com/hujan.png',
            berangin: 'http://example.com/berangin.png',
            mendung: 'http://example.com/mendung.png',
            badai: 'http://example.com/badai.png',
            petir: 'http://example.com/petir.png',
        }; //masih kurang lengkap
        return weatherImages[degreeImg] || 'http://example.com/default.png';
    };

    // Data statis contoh
    const exampleData = {
        aqi: 50,
        degree: 30,
        degree_img: 'berawan',
        wind: 80,
        humidity: 90,
        date: new Date().toISOString(),
    };

    // Route untuk /api/home
    server.route({
        method: 'GET',
        path: '/api/home',
        handler: () => {
            const response = {
                ...exampleData,
                string_aqi: getAQIString(exampleData.aqi),
                degree_img: getWeatherImage(exampleData.degree_img),
            };
            return response;
        },
    });

    // Route untuk /api/recomendation
    server.route({
        method: 'GET',
        path: '/api/recomendation',
        handler: () => {
            const response = {
                ...exampleData,
                string_aqi: getAQIString(exampleData.aqi),
                degree_img: getWeatherImage(exampleData.degree_img),
            };
            return response;
        },
    });

    await server.start();
    console.log(`Server running on ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
