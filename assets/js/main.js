var app = new Vue({
    el: '#app',
    data: {
        mapboxData: [],
        weatherData: [],
        inpsearch: '',
        actbtn: 0,
        pos: '',
    },
    methods: {
        async obtainCity(){

            const paramsmapbox = { 
                limit: 5,
                language: 'en',
                access_token: 'pk.eyJ1IjoidG9lbDMzMyIsImEiOiJja3l0am0zOTAxZWJ4MnNwZWQyejZ4aXh0In0.2yYUJ_TslONbnCllYRzdDQ' 
            }

            await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.inpsearch}.json?access_token=${paramsmapbox.access_token}&limit=${paramsmapbox.limit}`)
                .then(response => response.json())
                .then(data => this.mapboxData = data.features);

            if (this.inpsearch.length > 0) {
                const index = this.mapboxData.findIndex((object) => {
                    return object.place_name == this.inpsearch;
                });
                
                if (this.inpsearch === this.mapboxData[index].place_name) {
                    this.actbtn = 1;
                    this.pos = index;
                }
            }

        },
        async obtainWeather(){

            const params = { 
                units: 'metric',
                lang: 'en',
                appid: '1d6b31d3e025b0f1f419b3b68b34eac9' 
            }

            await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.mapboxData[this.pos].center[1]}&lon=${this.mapboxData[this.pos].center[0]}&units=${params.units}&lang=${params.lang}&appid=${params.appid}`)
                .then(response => response.json())
                .then(data => this.weatherData = data);

        },
        restart(){
            location.href = 'index.html';
        },
        updateLocalStorage(){
            //localStorage.setItem('users', JSON.stringify(this.newUsers));
        },
        
    },
    created() {
        /*if (localStorage.getItem('users') !== null) {
            this.newUsers = JSON.parse(localStorage.getItem('users'));
            this.users = JSON.parse(localStorage.getItem('mainusers'));
        }else{
            this.listUsers();
            this.users = this.users;
        }*/

    },
});
