// particles-js
//  * ¸ü¶à£ºhttp://www.bootstrapmb.com
var particles = document.querySelector('#particles-js');
if (particles) {
    particlesJS('particles-js',

    {
    "particles": {
        "number": {
        "value": 100,
        "density": {
            "enable": true,
            "value_area": 1000
        }
        },
        "color": {
        "value": "#ffffff"
        },
        "shape": {
        "type": "circle",
        "stroke": {
            "width": 0,
            "color": "#000000"
        },
        "polygon": {
            "nb_sides": 5
        },
        "image": {
            "src": "img/github.svg",
            "width": 100,
            "height": 100
        }
        },
        "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
        }
        },
        "size": {
        "value": 5,
        "random": true,
        "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
        }
        },
        "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
        },
        "move": {
        "enable": true,
        "speed": 6,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
        }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
        "onhover": {
            "enable": true,
            "mode": "repulse"
        },
        "onclick": {
            "enable": true,
            "mode": "push"
        },
        "resize": true
        },
        "modes": {
        "grab": {
            "distance": 400,
            "line_linked": {
            "opacity": 1
            }
        },
        "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
        },
        "repulse": {
            "distance": 200
        },
        "push": {
            "particles_nb": 4
        },
        "remove": {
            "particles_nb": 2
        }
        }
    },
    "retina_detect": true,
    "config_demo": {
        "hide_card": false,
        "background_color": "#b61924",
        "background_image": "",
        "background_position": "50% 50%",
        "background_repeat": "no-repeat",
        "background_size": "cover"
    }
    }

    );
};

(function($) {
    var allfunction = {

        //============== Menu Icon ============== 
        menu_icon: function() {
            $('.main-menu ul li').each(function() {
                if ($(this).children('.sub-menu,.mega-menu,.hdr-cretors-wrapper').length) {
                    $(this).append('<span class="nav-drop-arrow"><span class="iconify" data-icon="akar-icons:chevron-down"></span></span>');
                }
            });
            $('.hv4-main-menu ul li').each(function() {
                if ($(this).children('.sub-menu,.mega-menu,.hdr-cretors-wrapper').length) {
                    $(this).append('<span class="nav-drop-arrow"><span class="iconify" data-icon="akar-icons:chevron-down"></span></span>');
                }
            });
        },

        //=============== Menu ==============
        menu_toggle: function(){
            var mainMenu = $('.main-menu,.hv4-main-menu'),
                menuBody = $("body"),
                hamburger = $('.hamburger');

                hamburger.on("click", function() {
                    mainMenu.toggleClass('active');
                    menuBody.toggleClass('main-menu-overlay');
                    $(".sticky-header").toggleClass('transprent-header');
            });

            $('#menu-close').on("click", function() {
                mainMenu.removeClass('active');
                menuBody.removeClass('main-menu-overlay');
                $(".sticky-header").toggleClass('transprent-header');
            })

            $('.nav-drop-arrow').click(function(e) {
                $(this).parent().toggleClass('active').children('.sub-menu,.mega-menu,.hdr-cretors-wrapper').slideToggle().addClass('active').parent('li').siblings().removeClass('active').find('.sub-menu,.mega-menu,.hdr-cretors-wrapper').slideUp().removeClass('active');
                console.log($(this))
            });

            $(document).on('click', function(event){
                if(!mainMenu.is(event.target) && !mainMenu.has(event.target).length && !hamburger.is(event.target) && !hamburger.has(event.target).length){
                    mainMenu.removeClass('active');
                    $(".sticky-header").removeClass('transprent-header');
                    menuBody.removeClass('main-menu-overlay');
                    $('.main-menu ul li').siblings().removeClass('active').find('.sub-menu,.mega-menu,.mega-menu,.hdr-cretors-wrapper').slideUp();

                }
            })
        },

        //================== Notification ======================
        notification: function() {
            var nf = $('.hdr-notification'),
                nfButton = $('#hdr-notification'),
                nfWrapper = $('.hdr-notification-wrapper');
            nfButton.on("click", function() {
                $(this).toggleClass('active');
                nfWrapper.toggleClass('hdr-notification-active');
            });
            $(document).on('click', function(event){
                if(!nf.is(event.target) && !nf.has(event.target).length){
                    nfButton.removeClass('active');
                    nfWrapper.removeClass('hdr-notification-active');
                }
            })

            $('.single-notification').on("click", function(){
                $(this).toggleClass('active');
            });
            $('.notification-delete').on("click", function(){
                $(this).parent('.single-notification').hide();
            });
        },

        //================== Cart Popup ======================
        cart_popup: function(){
            var nftCart = $('.hdr-cart'),
                nftCartButton = $('#hdr-cart'),
                nftCartDropdown = $('.hdr-crt-wrapper');
            nftCartButton.on("click", function() {
                $(this).toggleClass('active');
                nftCartDropdown.toggleClass('hdr-crt-active');
            });
            $(document).on('click', function(event){
                if(!nftCart.is(event.target) && !nftCart.has(event.target).length){
                    nftCartButton.removeClass('active');
                    nftCartDropdown.removeClass('hdr-crt-active');
                }
            })
        },

        //================== Header Profile ======================
        hdr_profile: function(){
            var hdrProfileWrapper = $('.hdr-profile'),
                hdrProfile = $('#hdr-profile'),
                hdrProfileMenu = $('.hdr-profile-menu');
                
            hdrProfile.on("click", function() {
                hdrProfileMenu.toggleClass('hdr-profile-active');
            });
            
            $(document).on('click', function(event){
                if(!hdrProfileWrapper.is(event.target) && !hdrProfileWrapper.has(event.target).length){
                    hdrProfileMenu.removeClass('hdr-profile-active');
                }
            })
        },

        //================== Header Wallet ======================
        hdr_wallet: function(){
            var nftWallet = $('.hdr-wallet'),
                nftWalletPopup = $('.my-wallet-popup'),
                $body = $("body");
            nftWallet.on("click", function() {
                nftWalletPopup.toggleClass('active');
                $body.toggleClass('wallet_overlay');
            });

            $(document).on('click', function(event){
                if(!nftWalletPopup.is(event.target) && !nftWalletPopup.has(event.target).length && !nftWallet.is(event.target) && !nftWallet.has(event.target).length){
                    nftWalletPopup.removeClass('active');
                    $body.removeClass('wallet_overlay');
                }
            })
        },

        //================== Header Search ======================
        hdr_search: function(){
            var searchIcon = $('#hdr-search'),
                searchIcon2 = $('#hdr-search-2'),
                srchWrapper = $('.hdr-search,.hdr-v6-search'),
                srchBody = $("body"),
                inputBox = $("#hv6-input_box");

            searchIcon.on("click", function() {
                srchWrapper.addClass('active');
                srchBody.addClass('search_overlay');
                $('.edit-profile-sidebar').removeClass('active');
            });

            searchIcon2.on("click", function() {
                srchWrapper.addClass('active');
                srchBody.addClass('search-v6_overlay');
            });

            $(document).on('click', function(event){
                if(!srchWrapper.is(event.target) && !srchWrapper.has(event.target).length && !inputBox.is(event.target) && !inputBox.has(event.target).length) {
                    srchWrapper.removeClass('active');
                    srchBody.removeClass('search_overlay search-v6_overlay transprent-hdr');
                }
            })

            $('#hdr-search-close').on("click", function() {
                srchWrapper.removeClass('active');
                srchBody.removeClass('search_overlay search-v6_overlay');
            });
        },
        
        // Settings
        settings: function() {
            var settingWrapper = $('#settings'),
                settingBody = $('body');
            $('#settings-switch').on("click", function() {
                settingWrapper.toggleClass('active');
                settingBody.addClass('settings-overflow');
            })
            $(document).on('click', function(event){
                if(!settingWrapper.is(event.target) && !settingWrapper.has(event.target).length){
                    settingWrapper.removeClass('active');
                    settingBody.removeClass('settings-overflow');
                }
            })
        },

        //============= Nice Select ===============
        nice_select: function(){
            $('select').niceSelect();
        },
        
        // Cart Active
        active_cart: function() {
            $('.clickable-cart').on('click', function() {
                $(this).toggleClass('active');
            })
        },
        
        //============= Counter Up ===============
        counter_up: function(){
            $('.odometer').appear(function (e) {
                var odo = $(".odometer");
                odo.each(function () {
                    var countNumber = $(this).attr("data-count");
                    $(this).html(countNumber);
                });
            });
        },

        //============== SVG IMG to SVG CODE ==================
        imgToSvg: function() {
            function jetix_svg() {
                jQuery('img').each(function() {
                    var jQueryimg = jQuery(this);
                    var imgClass = jQueryimg.attr('class');
                    var imgURL = jQueryimg.attr('src');
                    jQuery.get(imgURL, function(data) {
                        // Get the SVG tag, ignore the rest
                        var jQuerysvg = jQuery(data).find('svg');

                        // Add replaced image's classes to the new SVG
                        if (typeof imgClass !== 'undefined') {
                            jQuerysvg = jQuerysvg.attr('class', imgClass + ' replaced-svg');
                        }
                        jQuerysvg = jQuerysvg.removeAttr('xmlns:a');
                        // Replace image with new SVG
                        jQueryimg.replaceWith(jQuerysvg);

                    }, 'xml');

                });
            }
            $(document).each(function() {
                jetix_svg();
            })
        },

        //================ Accordion =================
        accordion: function() { 
            $(".single-faq .faq-head").click(function(e) {
                if ($(this).parent().hasClass('active')) { 
                    $(this).parent().removeClass("active").children('.faq-body').slideUp();
                }else{
                    $('.faq-content-wrapper').find('.single-faq').removeClass('active').children('.faq-body').slideUp();
                    $(this).parent().addClass("active").children('.faq-body').slideDown();
                }
            });
        },

        //=============== magnificPopup video view ================= 
        magnificPopup: function() {
            $('.popup-video').magnificPopup({
                type: 'iframe'
            });
         },

        //================ MP Order History Table ==================
        table: function(){
            $('#collector-table').DataTable({
                responsive: true,
                "searching": false,
                "paging": false,
                "info": false,
                "lengthChange":false
            });

            // NFT Rank
            $('#nft-rank-table').DataTable({
                responsive: true,
                "searching": false,
                "paging": false,
                "info": false,
                "lengthChange":false
            });


        },

        course_sideBar: function() {
            $('#sideBarBtn').on("click", function(e) {
                $('.course-v2-sidebar').toggleClass('active');
            })
            $('#sideBar_close').on("click", function() {
                $('.course-v2-sidebar').removeClass('active');
            })
        },

        // SLider Icon 
        slider_icon: function() {
            // Header Creator Slider
            var hdrcrtr_tmnl_slider = $('.hdr-cretors-slider')
            $(".hdrcrtr_next").click(function() {
                hdrcrtr_tmnl_slider.trigger("next.owl.carousel");
            });
            $(".hdrcrtr_prev").click(function() {
                hdrcrtr_tmnl_slider.trigger("prev.owl.carousel", [300]);
            });

            // Simple Tmnl Slider 
            var sim_tmnl_slider = $('.simple-testimonial-slider')
            $(".simTmnl_next").click(function() {
                sim_tmnl_slider.trigger("next.owl.carousel");
            });
            $(".simTmnl_prev").click(function() {
                sim_tmnl_slider.trigger("prev.owl.carousel", [300]);
            });


            // Profile Auction Slider 
            var profile_auction_slider = $('.profile-auction-item-slider')
            $(".pas_next").click(function() {
                profile_auction_slider.trigger("next.owl.carousel");
            });
            $(".pas_prev").click(function() {
                profile_auction_slider.trigger("prev.owl.carousel", [300]);
            });

            // Profile Collection Slider 
            var profile_collection_slider = $('.profile-collection-slider')
            $(".pas_next").click(function() {
                profile_collection_slider.trigger("next.owl.carousel");
            });
            $(".pas_prev").click(function() {
                profile_collection_slider.trigger("prev.owl.carousel", [300]);
            });

            // Hv1 Banner Slider
            var hv1_banner_slider = $('.hv1-banner-slider')
            $(".hv1_b_next").click(function() {
                hv1_banner_slider.trigger("next.owl.carousel");
            });
            $(".hv1_b_prev").click(function() {
                hv1_banner_slider.trigger("prev.owl.carousel", [300]);
            });


            // Hv1 Auction Slider
            var hv1_auction_slider = $('.hv1-auction-slider')
            $(".hv1_auction_next").click(function() {
                hv1_auction_slider.trigger("next.owl.carousel");
            });
            $(".hv1_auction_prev").click(function() {
                hv1_auction_slider.trigger("prev.owl.carousel", [300]);
            });


            // Hv2 Hot Item 
            var hotItem_v2_slider = $('.hot-item-v2-slider')
            $(".hv2hot_next").click(function() {
                hotItem_v2_slider.trigger("next.owl.carousel");
            });
            $(".hv2hot_prev").click(function() {
                hotItem_v2_slider.trigger("prev.owl.carousel", [300]);
            });


            // Hv3 Tmnl
            var hv3Tmnl_slider = $('.tmnl-fluid-slider')
            $(".hv3Tmnl_next").click(function() {
                hv3Tmnl_slider.trigger("next.owl.carousel");
            });
            $(".hv3Tmnl_prev").click(function() {
                hv3Tmnl_slider.trigger("prev.owl.carousel", [300]);
            });


            // Hv5 Hot collection slider
            var hv5htclction_slider = $('.hv5-hot-collection-slider')
            $(".hv5hc_next").click(function() {
                hv5htclction_slider.trigger("next.owl.carousel");
            });
            $(".hv5hc_prev").click(function() {
                hv5htclction_slider.trigger("prev.owl.carousel", [300]);
            });


            // Hv5 Blog slider
            var hv5blog_slider = $('.hv5-blog-slider')
            $(".hv5blog_next").click(function() {
                hv5blog_slider.trigger("next.owl.carousel");
            });
            $(".hvblog_prev").click(function() {
                hv5blog_slider.trigger("prev.owl.carousel", [300]);
            });
        },

        // Modern Tmnl Slider
        modern_tmnl_slider: function() {
            $('.modern_tmnl_slider').owlCarousel({
                items:1,
                loop:false,
                center:true,
                margin:5,
                URLhashListener:true,
                startPosition: 'URLHash',
                autoplay: false,
                mouseDrag: false,
                touchDrag: false,
                autoplayHoverPause:false,
            });
        },
        // Mordern Slider Option
        mordern_Slider_option: ()=> {
            $('.mdrn-tmnl-option .url').on("click", function() {
                $(this).addClass('active').siblings().removeClass('active');
            });
        },

        // Hv3 Tmnl Slider 
        hv4_tmnl_slider: function() {
            $('.hv4_tmnl_slider').owlCarousel({
                items:1,
                loop:false,
                center:true,
                margin:10,
                URLhashListener:true,
                autoplay: false,
                mouseDrag: false,
                autoplayHoverPause:false,
                // startPosition: 'URLHash'
            });
        },

        // CountDown Clock
        countdown_clock: function() {
            if( $(".countdown-clock").length ){
                $('.countdown-clock').countdown('2023/10/10', function(event) {
                    $('.clock-days').html(event.strftime('%D'));
                    $('.clock-hours').html(event.strftime('%H'));
                    $('.clock-minutes').html(event.strftime('%M'));
                    $('.clock-seconds').html(event.strftime('%S'));
                });
            };
        },

        // Collection SideBar
        collection_sidebar: function() {
            $(".collection-single-sidebar .title").on ("click", function() {
                $(this).toggleClass('active').siblings(".collection-sidebar-items").slideToggle().parent().siblings().children().removeClass('active').next().slideUp();
            })
        },

        //=============== Sticky Header ================= 
        sticky_menu: function() {
            let win = $(window);
            let sticky_id = $(".header-area,.header-v4-area,.header-v6-main");
            // let sticky_body = $('body');
            win.on('scroll', function () {
                let scroll = win.scrollTop();
                if (scroll < 245) {
                    sticky_id.removeClass("sticky-header");
                    // sticky_body.removeClass("sticky-body");
                } else {
                    sticky_id.addClass("sticky-header");
                    // sticky_body.addClass("sticky-body");
                }
            });
        },

        //=============== Scroll Up ================= 
        scrollUp: function() {
            $(window).scroll(function () {
                if ($(this).scrollTop() !== 0) {
                    $('#scroll-up').fadeIn();
                } else {
                    $('#scroll-up').fadeOut();
                }
            });
            
            $('#scroll-up').on('click', function () {
                $("html, body").animate({scrollTop: 0});
                return false;
            });
        },


        // Isotop 
        isotop: () => {
            var $grid = $('.hv1-feature-content').isotope({
                itemSelector: '.hv1-ftur-item',
                percentPosition: true,
                masonry: {
                  columnWidth: 0
                }
            })
            $('.hv1-feature-nav').on( 'click', 'button', function() {
                var filterValue = $(this).attr('data-filter');
                $grid.isotope({ filter: filterValue });
            });
          
                // change is-checked class on buttons
            $('.hv1-feature-nav button').on('click', function() {
                $(this).addClass('active').siblings().removeClass('active');
            }); 
        },

        subscribe: ()=> {
            $(window).on('load', function () {
                var subscribePopup = $('#subscribe-popup'),
                    subscribeBody = $('body');
    
                    if( $("#subscribe-popup").length ) {
                        setTimeout(function(){
                            subscribePopup.addClass('active');
                            subscribeBody.addClass('subscribeBody');
                        },5000);
                    }
                    
                $('.hv4-subscribe-close').on("click", function() {
                    subscribePopup.removeClass('active');
                    subscribeBody.removeClass('subscribeBody');
                });
            });
        },

        // aos_aimation
        aos_aimation: function(){
            AOS.init({
                duration: 1000,
                once: true,
                offset: 50,
                anchorPlacement: 'top-bottom',
            }); 
        },

        init: function() {
            allfunction.imgToSvg()
            allfunction.menu_icon()
            allfunction.slider_icon()
            allfunction.notification()
            allfunction.cart_popup()
            allfunction.hdr_profile()
            allfunction.menu_toggle()
            allfunction.sticky_menu()
            allfunction.scrollUp()
            allfunction.hdr_wallet()
            allfunction.hdr_search()
            allfunction.active_cart()
            allfunction.magnificPopup()
            allfunction.modern_tmnl_slider()
            allfunction.accordion()
            allfunction.nice_select()
            allfunction.table()
            allfunction.countdown_clock()
            allfunction.collection_sidebar()
            allfunction.counter_up()
            allfunction.isotop()
            allfunction.settings()
            allfunction.subscribe()
            allfunction.mordern_Slider_option()
            allfunction.aos_aimation()
        },
    }

    $(document).ready(function() {
        allfunction.init();
        window.addEventListener('load',function(){
            document.querySelector('body').classList.add("loaded")  
        });
    });
    
})(jQuery);

// Mouse Move
document.addEventListener("mousemove", parallax);
function parallax(e) {
    document.querySelectorAll(".anemiXY").forEach(function(move){

        var moving_value = move.getAttribute("data-value");

        var x = (e.clientX * moving_value) / 300;
        var y = (e.clientY * moving_value) / 300;

        move.style.transform = "translateX(" + x + "px) translateY(" + y + "px)";
    })
}


// Range Slider
const sliderValue = document.getElementById("slidValue");
const sliderinput = document.getElementById("inputSlid");
const progress = document.getElementById("range_progress");

if(progress) {
    sliderinput.oninput = (()=> {
        let value = sliderinput.value;
        sliderValue.textContent = value;
        sliderValue.style.left = value + "%";
        progress.style.width = value + "%";
    });
}

// Copy Text
const copTxt_btn = document.querySelector("#copy-txt-handel");
const copyTxt = document.querySelector('#copyTxt-content');

if (copyTxt) {
    copTxt_btn.addEventListener("click", function() { 
        let input = copyTxt.querySelector('#copy-text');
        input.select();
        document.execCommand("copy");
        copTxt_btn.classList.add('active');
        window.getSelection().removeAllRanges();
        setTimeout(function(){
            copTxt_btn.classList.remove('active');
        }, 2000);
    })
}

anime({
    targets: '#animy-select .txtShape',
    strokeDasharray: [anime.setDashoffset, 5],
    easing: 'easeInOutSine',
    duration: 1500,
    delay: function(el, i) { return i * 250 },
    direction: 'alternate',
    loop: true
});


// Color 
// function gradientPurl() {
// 	document.documentElement.setAttribute('data-theme', 'gradientPurl');
//     localStorage.setItem('selected-theme', 'gradientPurl');
// }

// function gradientViolet() {
// 	document.documentElement.setAttribute('data-theme', 'gradientViolet');
//     localStorage.setItem('selected-theme', 'gradientViolet');
// }

// function gradientdark() {
// 	document.documentElement.setAttribute('data-theme', 'gradientdark');
//     localStorage.setItem('selected-theme', 'gradientdark');
// }

// function themeGamboge() {
// 	document.documentElement.setAttribute('data-theme', 'themeGamboge');
//     localStorage.setItem('selected-theme', 'themeGamboge');
// }

// function themeGreyish() {
// 	document.documentElement.setAttribute('data-theme', 'themeGreyish');
//     localStorage.setItem('selected-theme', 'themeGreyish');
// }


// For set color
// var windowUrl = window.location.pathname;
// if (windowUrl === "/home-v3.html") {
//     localStorage.setItem('selected-theme', 'gradientViolet');
// }
// if (windowUrl === "/home-v5.html") {
//     localStorage.setItem('selected-theme', 'gradientPurl');
// }






// if(typeof(Storage) !== 'undefined') {
//     if (localStorage.getItem('selected-theme') == 'gradientPurl') {
//         document.documentElement.setAttribute('data-theme', 'gradientPurl');
//         var settingsInput = document.querySelector('.purl input');
//         if (settingsInput) {
//             settingsInput.checked = true;
//         }
//     }
// }
// if(typeof(Storage) !== 'undefined') {
//     if (localStorage.getItem('selected-theme') == 'gradientViolet') {
//         document.documentElement.setAttribute('data-theme', 'gradientViolet');
//         var settingsInput = document.querySelector('.violet input');
//         if (settingsInput) {
//             settingsInput.checked = true;
//         }
//     }
// }

// if(typeof(Storage) !== 'undefined') {
//     if (localStorage.getItem('selected-theme') == 'gradientdark') {
//         document.documentElement.setAttribute('data-theme', 'gradientdark');
//         var settingsInput = document.querySelector('.gradientdark input');
//         if (settingsInput) {
//             settingsInput.checked = true;
//         }
//     }
// }

// if(typeof(Storage) !== 'undefined') {
//     if (localStorage.getItem('selected-theme') == 'themeGamboge') {
//         document.documentElement.setAttribute('data-theme', 'themeGamboge');
//         var settingsInput = document.querySelector('.gamboge input');
//         if (settingsInput) {
//             settingsInput.checked = true;
//         }
//     }
// }

// if(typeof(Storage) !== 'undefined') {
//     if (localStorage.getItem('selected-theme') == 'themeGreyish') {
//         document.documentElement.setAttribute('data-theme', 'themeGreyish');
//         var settingsInput = document.querySelector('.greyish input');
//         if (settingsInput) {
//             settingsInput.checked = true;
//         }
//     }
// }



// Border Radius Settings 
// function borderRadius() {
// 	document.documentElement.setAttribute('style', '--border-radius: 5px;');
// }

// function borderCorner() {
// 	document.documentElement.setAttribute('style', '--border-radius: 0px;');
// }

// function borderCircle() {
//     document.documentElement.setAttribute('style', '--border-radius: 50px;');
// }


// var el = document.querySelectorAll('.button-settings button');
// for (let i = 0; i < el.length; i++) {
//   el[i].onclick = function() {
//     var c = 0;
//     while (c < el.length) {
//       el[c++].classList.remove('active');
//     }
//     el[i].classList.add('active');
//   };
// }