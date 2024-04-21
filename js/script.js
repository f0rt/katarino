document.addEventListener('DOMContentLoaded', function() {


   // Get all buttons with the class 'cta-button'
    var buttons = document.getElementsByClassName('cta-button');

    // Convert HTMLCollection to an array to use forEach (or use a for loop)
    Array.from(buttons).forEach(function(button) {
        // Attach click event listener to each button
        if (button.id != "room_button" && button.id != "my-form-button"){
            button.addEventListener('click', function() {
                if (/Mobi|Android/i.test(navigator.userAgent)) {
                    // Mobile device detected, initiate a call
                    window.location.href = 'tel:0896840077'; // Replace +1234567890 with your phone number
                } else {
                    // Scroll to the element with ID 'dd'
                    document.getElementById('dd').scrollIntoView({
                        behavior: 'smooth'
                    });
                }
                
                // Track the event with Google Analytics
                gtag('event', 'cta', {'event_category': 'CTA', 'event_label': 'CTA'});
            });
        }
    });

    document.getElementById('room_button').addEventListener('click', function() {
        document.getElementById('room_nav').scrollIntoView({
            behavior: 'smooth'
        });
        gtag('event', 'view_rooms', {'event_category': 'Map', 'event_label': 'View-Rooms'});
    });

      

    new Splide(".splide-header",{
            type       : 'loop',
            pagination : true,
            arrows     : false,
            height     : '30vh',
            autoWidth  : false,
            autoHeight : true,
            autoplay   : true,
        } ).mount();

        new Splide(".splide-katarino",{
            type       : 'loop',
            pagination : true,
            arrows     : true,
            height     : '30vh',
            autoWidth  : false,
            autoHeight : true,
            autoplay   : false,
        } ).mount();


        new Splide(".splide-rooms",{
            type       : 'loop',
            pagination : true,
            arrows     : true,
            height     : '30vh',
            autoWidth  : false,
            autoHeight : true,
            autoplay   : false,
        } ).mount();

    let map;

    async function initMap() {
        var customMapStyles =[
            {
                "featureType": "all",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ebe3cd"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#523735"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#f5f1e6"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#c9b2a6"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#dcd2be"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#ae9e90"
                    }
                ]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dfd2ae"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dfd2ae"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#93817c"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#a5b076"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#447530"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f1e6"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f8c967"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#e9bc62"
                    }
                ]
            },

            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e98d58"
                    }
                ]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#db8555"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#fdfcf8"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#806b63"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dfd2ae"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#8f7d77"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#ebe3cd"
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dfd2ae"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#b9d3c2"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#92998d"
                    }
                ]
            }
        ];
        // Specify the location for the center of the map
        var myLocation = {lat: 41.886803, lng: 23.426488};
        const { Map } = await google.maps.importLibrary("maps");

        map = new Map(document.getElementById("map"), {
            center: myLocation,
            zoom: 12,
            mapTypeControl: false,
            streetViewControl: false,
            styles: customMapStyles,
        });

        var marker = new google.maps.Marker({
            map: map,
            position: myLocation,
            title: 'Апартамент',
            icon: {
                url: '/img/icon/marker-home.svg',
                // Size of the image
                size: new google.maps.Size(60, 60),
                // Specifies the point within the icon image that is anchored to the marker's position
                anchor: new google.maps.Point(30, 60),
                // Specifies the image's origin point (top-left corner of the image portion to use)
                origin: new google.maps.Point(0, 0),
                // Scales the icon size
                scaledSize: new google.maps.Size(60, 60)
              },
        });
    }

    initMap();
});

let splides = {};
splides["Tab1"] = true;
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    let tab = document.getElementById(tabName)
    tab.style.display = "flex";

    if(!splides[tabName]){
        splides[tabName] = true;
        new Splide(tab.getElementsByClassName("splide-rooms")[0],{
            type       : 'loop',
            pagination : true,
            arrows     : true,
            height     : '30vh',
            autoWidth  : false,
            autoHeight : true,
            autoplay   : false,
        } ).mount();
    }
    evt.currentTarget.className += " active";

    gtag('event', 'room_tab', {'event_category': 'Room-Interaction', 'event_label': 'Send-Message'});
}