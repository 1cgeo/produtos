const map = new maplibregl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/streets-v2/style.json?key=tLpO7P2cZG0MPIqHCFYJ',
    ...INIT_ZOOM

});

var activeGeoJson = null
var activeSubtitle = null;
var activeSubtitleCount = null;
var activeSubtitleOrto = null;
var activeSubtitleOrtoCount = null;
var activeYearInterval = null;
var activeSlide = null
var hideTopo = false
var hideOrto = false
var yearFilter = null;
var autoplay = false
var presentationDelay = 5 * 1000
var fixedZoom = false

closepopup = () => {
    let closeButton = document.querySelector('.maplibregl-popup-close-button');
    if (closeButton) {
        closeButton.click();
    }
}

updateYear = () => {
    closepopup()
    unsetChapter(true)
    setKML()
    fixedZoom=true
    setCurrentChapter(activeSlide, true)
}

filterGeo = (year, updateGeoJson = false) => {
    let count1 = {"Não mapeado":0, "Concluído": 0, "Múltiplas edições":0}
    let count2 = {"Não mapeado":0, "Concluído": 0, "Múltiplas edições":0}
    var newGeoJson = {
        ...activeGeoJson,
        features: activeGeoJson.features.map(feature => ({
            ...feature,
            properties: {
                ...feature.properties,
                edicoes_topo: feature.properties.edicoes_topo?.filter(val => parseInt(val) >= (year || 1900)),
                edicoes_orto: feature.properties.edicoes_orto?.filter(val => parseInt(val) >= (year || 1900))
            }
        }))
    };
    if(hideTopo){
        newGeoJson = {
            ...newGeoJson,
            features: newGeoJson.features.map(feature => ({
                ...feature,
                properties: {
                    ...feature.properties,
                    edicoes_topo: [],
                    situacao_topo: "Não mapeado",
                }
            }))
        };
    }
    if(hideOrto){
        newGeoJson = {
            ...newGeoJson,
            features: newGeoJson.features.map(feature => ({
                ...feature,
                properties: {
                    ...feature.properties,
                    edicoes_orto: [],
                    situacao_orto: "Não mapeado",
                }
            }))
        };
    }
    for (let i = newGeoJson.features.length; i > 0; i--) {
        let feature = newGeoJson.features[i - 1]
        if ("edicoes_topo" in feature.properties){
            feature?.properties?.edicoes_topo?.length==0 ? count1["Não mapeado"]+=1 : feature?.properties?.edicoes_topo?.length==1 ? count1["Concluído"]+=1 : feature?.properties?.edicoes_topo?.length>1 ? count1["Múltiplas edições"]+=1 : null
        }
        if ("edicoes_orto" in feature.properties){
            feature?.properties?.edicoes_orto?.length==0 ? count2["Não mapeado"]+=1 : feature?.properties?.edicoes_orto?.length==1 ? count2["Concluído"]+=1 : feature?.properties?.edicoes_orto?.length>1 ? count2["Múltiplas edições"]+=1 : null
        }
        if ("situacao" in feature.properties){
            feature?.properties?.situacao == 'Concluído' ? count1["Concluído"]+=1 : count1["Não mapeado"]+=1
        }
    }
    activeSubtitleCount = count1
    activeSubtitleOrtoCount = count2
    if(updateGeoJson){
        return newGeoJson
    }
}

loadLegend = (
    legend,
    legendOrto,
    yearInterval,
    legendElId
) => {
    if (!legend || legend.length === 0) return;
    let slideIndex = getSlideIndex(activeSlide);
    var layers = legend.filter((value, index) => index % 2 === 0);
    var colors = legend.filter((value, index) => index % 2 !== 0);

    let legendEl = document.getElementById(legendElId);
    
    let initialVisibility1 = (slideIndex > 2 && slideIndex < 7) ? (hideTopo ? 'hidden' : 'visible') : 'visible';
    let initialVisibility2 = (slideIndex > 2 && slideIndex < 7) ? (hideOrto ? 'hidden' : 'visible') : 'visible';
    let initialDisplay = (slideIndex > 2 && slideIndex < 7) ? ((hideOrto && hideOrto) ? 'none' : 'flex') : 'flex';
    let topoButtonColor = hideTopo ? 'rgba(70, 130, 180, 0.2)' : 'rgba(70, 130, 180, 0.6)';
    let ortoButtonColor = hideOrto ? 'rgba(70, 130, 180, 0.2)' : 'rgba(70, 130, 180, 0.6)';

    legendEl.style.display = 'block';
    legendEl.style.width = (legendOrto && legendOrto.length > 0) ? (mobileScreen() ? '350px' : '450px') : '225px';
    legendEl.innerHTML = '';

    let legendTitle1 = `<h4 id="topoButton" style="cursor: pointer; flex: 1; border-radius: 8px; padding: 5px 5px; margin: 10px 10px; background-color: ${topoButtonColor};">Carta Topográfica</h4>`;
    let legendTitle2 = `${legendOrto && legendOrto.length > 0 ? `<h4 id="ortoButton" style="cursor: pointer; flex: 1; border-radius: 8px; padding: 5px 5px; margin: 10px 10px; background-color: ${ortoButtonColor};">Carta Ortoimagem</h4>` : ''}`;

    let legendTitle = (slideIndex > 2 && slideIndex < 7) ? `
        <div style="display: flex; flex-direction: row">
            ${legendTitle1}
            ${legendTitle2}
        </div>
    ` : '';
    
    let subtitleCount = activeSubtitleCount;
    let legendContent1 = layers.map((layer, i) => {
        let color = colors[i];
        let count = subtitleCount[layer] || 0;
        return `
            <div>
                <span class="legend-key" style="background-color: ${color};"></span>
                <span class="legend-value">${layer} (<span id="subtitleCountValue-${i}">${JSON.stringify(count)}</span>)</span>
            </div>
        `;
    }).join('');

    let legendContent2 = '';
    let subtitleOrtoCount = activeSubtitleOrtoCount;
    if (legendOrto && legendOrto.length > 0) {
        let ortoLayers = legendOrto.filter((value, index) => (index % 2) === 0);
        let ortoColors = legendOrto.filter((value, index) => (index % 2) !== 0);

        legendContent2 = ortoLayers.map((layer, i) => {
            let color = ortoColors[i];
            let count = subtitleOrtoCount[layer] || 0;
            return `
                <div>
                    <span class="legend-orto-key" style="border-bottom: 4px solid ${color};"></span>
                    <span class="legend-value">${layer} (<span id="subtitleOrtoCountValue-${i}">${JSON.stringify(count)}</span>)</span>
                </div>
            `;
        }).join('');
    }

    let legendContent = `
        <div id="legendContent" style="display: ${initialDisplay}; flex-direction: row;">
            <div id="legendContent1" style="flex: 1; visibility: ${initialVisibility1};">${legendContent1}</div>
            <div id="legendContent2" style="flex: 1; visibility: ${initialVisibility2};">${legendContent2}</div>
        </div>
    `;
    let year = (yearFilter >= yearInterval.min && yearFilter <= yearInterval.max) ? yearFilter : yearFilter < yearInterval.min ? yearInterval.min : yearInterval.max;
    let sliderContent = (slideIndex > 2 && slideIndex < 7) ? `
        <h4>Escolha a partir de qual ano exibir as cartas</h4>
        <input type="range" min="${yearInterval.min}" max="${yearInterval.max}" value="${year}" id="sliderFilter" list="values" step="1" autocomplete="false"/>
        <datalist id="values">
            <option value="${yearInterval.min}" label="${yearInterval.min}"></option>
            <option value="${yearInterval.max}" label="${yearInterval.max}"></option>
        </datalist>
        <span id="yearValue">${year}</span>
    ` : '';

    let content = legendTitle + legendContent + sliderContent;
    legendEl.innerHTML = content;

    let sliderFilter = document?.getElementById('sliderFilter');
    let yearValue = document?.getElementById('yearValue');
    function debounce(func, delay) {
        let timeout;
        return function() {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, arguments), delay);
        };
    }

    sliderFilter?.addEventListener('input', function() {
        year = parseInt(this.value, 10);
        filterGeo(year, false);
        subtitleCount = activeSubtitleCount;
        subtitleOrtoCount = activeSubtitleOrtoCount;
        yearValue.textContent = year;
        layers.forEach((layer, i) => {
            let subtitleCountValue = document.querySelector(`#subtitleCountValue-${i}`);
            let count = subtitleCount[layer] || 0;
            subtitleCountValue.textContent = JSON.stringify(count);
        });
        let ortoLayers = legendOrto.filter((value, index) => (index % 2) === 0);
        ortoLayers.forEach((layer, i) => {
            let subtitleOrtoCountValue = document.querySelector(`#subtitleOrtoCountValue-${i}`);
            let count = subtitleOrtoCount[layer] || 0;
            subtitleOrtoCountValue.textContent = JSON.stringify(count);
        });
        debounceUpdateYear(year);
    });

    let debounceUpdateYear = debounce(function(year) {
        updateYear();
        yearFilter = year;
    }, 100);

    let topoButton = document.getElementById("topoButton");
    let ortoButton = document.getElementById("ortoButton");
    let legendContent1El = document.getElementById("legendContent1");
    let legendContent2El = document.getElementById("legendContent2");
    let legendContentEl = document.getElementById("legendContent");

    topoButton?.addEventListener('click', function() {
        let isHidden = legendContent1El.style.visibility !== 'hidden';
        legendContent1El.style.visibility = isHidden ? 'hidden' : 'visible';
        topoButton.style.backgroundColor = isHidden ? 'rgba(70, 130, 180, 0.2)' : 'rgba(70, 130, 180, 0.6)';
        hideTopo = isHidden ? true : false;
        updateLegendDisplay();
    });

    ortoButton?.addEventListener('click', function() {
        let isHidden = legendContent2El.style.visibility !== 'hidden';
        legendContent2El.style.visibility = isHidden ? 'hidden' : 'visible';
        ortoButton.style.backgroundColor = isHidden ? 'rgba(70, 130, 180, 0.2)' : 'rgba(70, 130, 180, 0.6)';
        hideOrto = isHidden ? true : false;
        updateLegendDisplay();
    });

    function updateLegendDisplay() {
        if (legendContent1El.style.visibility === "hidden" && legendContent2El.style.visibility === "hidden") {
            legendContentEl.style.display = "none";
        } else {
            legendContentEl.style.display = "flex";
        }
        updateYear();
    }
}


loadGeoJSON = (loteName, styles) => {
    closepopup()
    return fetch(`data/${loteName}.geojson`
        , {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
    )
        .then(function (response) {
            return response.json();
        })
        .then(async (geoJson) => {
            activeGeoJson= geoJson
            const extent = geojsonExtent(geoJson)
            console.log(extent)
            !fixedZoom ? map.fitBounds([
                [extent[0] - 1, extent[1] - 1],
                [extent[2] + 1, extent[3] + 1]
            ]) : fixedZoom=false
            setKML(tokml(geoJson), loteName)
            let newGeoJson = filterGeo(yearFilter, true);
            map.addSource(loteName, {
                "type": "geojson",
                "data": newGeoJson
            })
            for (let style of styles) {
                map.addLayer(style)
                if (!style.id.includes('-fill')) continue

                map.on('mouseenter', style.id, function () {
                    map.getCanvas().style.cursor = 'pointer';
                });
                map.on('mouseleave', style.id, function () {
                    map.getCanvas().style.cursor = '';
                });
            }
        });

}

const setKML = (kml, loteName) => {
    if (!kml) {
        $("#kml-button").remove()
        return
    }
    var hash = window.btoa(unescape(encodeURIComponent(kml)))
    var a = $(`
    <a 
        href="data:application/octet-stream;charset=utf-8;base64,${hash}" 
        download="${loteName}.kml"
        id="kml-button"
        >
            Download KML
         </a>
    `)
    $(".append-buttons").append(a)
}

const getButtonProps = (active) => {
    return {
        'text': active ? 'Pausar Apresentação' : 'Iniciar Apresentação',
        'color': active ? '#E0E0E0' : ''
    }
}

setCurrentChapter = async (currentSlideId, sameChapter) => {
    let projectSettings = getProjectSettings()
    let projectName = currentSlideId.split(getSeperatorId())[0]
    let loteName = currentSlideId.split(getSeperatorId())[1]
    let loteSettings = projectSettings[projectName].lotes.find(item => item.name == loteName)
    await loadGeoJSON(loteName, loteSettings.styles)
    activeSlide = currentSlideId
    activeSubtitle = loteSettings.legend
    activeSubtitleOrto = loteSettings.legendOrto
    activeYearInterval = loteSettings.yearInterval
    if (!mobileScreen() && !sameChapter) {
        loadLegend(
            activeSubtitle,
            activeSubtitleOrto,
            activeYearInterval,
            'legend'
        )
    }
}

unsetChapter = (fixingLegend) => {
    let projectSettings = getProjectSettings()
    for (let projectName in projectSettings) {
        for (let lote of projectSettings[projectName].lotes) {
            for (let style of lote.styles) {
                if (map.getLayer(style.id)) { // Verifica se a camada existe
                    map.removeLayer(style.id);
                }
            }
            if (map.getSource(lote.name)) { // Verifica se a fonte existe
                map.removeSource(lote.name);
            }
        }
    }
    if (!fixingLegend) {
        let legend = document.getElementById('legend');
        legend.style.display = '';
    }
}

hasSlideData = (projectName, loteName) => {
    let projectSettings = getProjectSettings()
    if (!Object.keys(projectSettings).includes(projectName)) return
    return projectSettings[projectName].lotes.find(item => item.name == loteName)
}

function plugin({ swiper, extendParams, on }) {
    extendParams({
        debugger: false,
    });

    on('slideChange', async () => {
        setKML()
        if (!swiper.slides[swiper.previousIndex]) return
        let previousSlideId = swiper.slides[swiper.previousIndex].getAttribute('id')
        let currentSlideId = swiper.slides[swiper.activeIndex].getAttribute('id')
        let currentSlideIndex = getSlideIndex(currentSlideId)
        if (previousSlideId == currentSlideId) return
        if (previousSlideId || currentSlideId == "section") {
            let prevProjectName = previousSlideId.split(getSeperatorId())[0]
            let prevLoteName = previousSlideId.split(getSeperatorId())[1]
            if (hasSlideData(prevProjectName, prevLoteName)) {
                unsetChapter(false)
            }
        }
        let currProjectName = currentSlideId.split(getSeperatorId())[0]
        let currLoteName = currentSlideId.split(getSeperatorId())[1]
        if (!hasSlideData(currProjectName, currLoteName)) {
            document.getElementById("legend-icon").style.display = ''
            document.getElementById("search-icon").style.display = ''
            return
        }
        if (mobileScreen()){
            document.getElementById("legend-icon").style.display = 'block'
            if(currentSlideIndex > 2 && currentSlideIndex < 7){
                document.getElementById("search-icon").style.display = 'block'
            }else{
                document.getElementById("search-icon").style.display = 'none'
            }
        }
        await setCurrentChapter(currentSlideId, false)
    });

}

var swiperWidget = new Swiper(".swiper-app", {
    modules: [plugin],
    direction: "horizontal",
    autoplay: {
        delay: presentationDelay,
        disableOnInteraction: false
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    freeMode: true
});

swiperWidget.autoplay.stop()

let buttonProps = getButtonProps(false)
$("#play-button").html(buttonProps.text);
$("#play-button").css('background-color', buttonProps.color);

getSlideIndex = (slideId) => {
    for (let [idx, el] of swiperWidget.slides.entries()) {
        if (el.getAttribute('id') == slideId) {
            return idx
        }
    }
}

const hasSlideIndex = (slideIdx) => {
    for (let [idx, el] of swiperWidget.slides.entries()) {
        if (idx == slideIdx) {
            return true
        }
    }
    return false
}

mobileScreen = () => {
    return window.screen.width <= 960
}

connectEvents = () => {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    // We listen to the resize event
    window.addEventListener('resize', () => {
        // We execute the same script as before
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
    map.on('load', () => {
        map.flyTo(INIT_ZOOM)
        document.getElementById('info').scrollTo(0, 0)
        map.on('mouseup', () => {
            let bounds = map.getBounds()
        });
    })

    //map.scrollZoom.disable();
    map.addControl(new maplibregl.NavigationControl());

    document
        .querySelector('#summary-button')
        .addEventListener('click', (e) => {
            e.preventDefault();
            swiperWidget.slideTo(
                getSlideIndex('summary'),
                0
            );
        });

    document
        .querySelectorAll('a:not(#kml-button)')
        .forEach(el => {
            if (
                el.getAttribute('id') &&
                el.getAttribute('id').includes('summary-button')
            ) {
                return
            }
            el.addEventListener('click', (e) => {
                e.preventDefault();
                swiperWidget.slideTo(
                    getSlideIndex(
                        e.target.getAttribute('id')
                    ),
                    0
                );
            });
        })

    var modal1 = document.getElementById("legend-modal");

    var btn1 = document.getElementById("legend-icon");

    var btn2 = document.getElementById("search-icon");

    var span = document.getElementsByClassName("close")[0];

    btn1.onclick = () => {
        loadLegend(
            activeSubtitle,
            activeSubtitleOrto,
            activeYearInterval,
            'modal1-text'
        )
        modal1.style.display = "block";
    }

    btn2.onclick = () => {
        loadLegend(
            activeSubtitle,
            activeSubtitleOrto,
            activeYearInterval,
            'modal1-text'
        )
        modal1.style.display = "block";
    }

    span.onclick = () => {
        modal1.style.display = "none";
    }

    window.onclick = (event) => {
        if (event.target == modal1) {
            modal1.style.display = "none";
        }
    }

    window.addEventListener('resize', (event) => {
        if (mobileScreen()) {
            const legend = document.getElementById('legend');
            legend.style.display = ''
            let projectName = swiperWidget?.slides[swiperWidget.activeIndex]?.getAttribute('id')?.split(getSeperatorId())[0]
            let loteName = swiperWidget?.slides[swiperWidget.activeIndex]?.getAttribute('id')?.split(getSeperatorId())[1]
            if (hasSlideData(projectName, loteName)) {
                document.getElementById("legend-icon").style.display = 'block'
            }
        } else {
            document.getElementById("legend-icon").style.display = ''
            modal1.style.display = "none"
            loadLegend(
                activeSubtitle,
                activeSubtitleOrto,
                activeYearInterval,
                'legend'
            )
        }
    }, true);

    $('#play-button').on('click', async () => {
        let currentSlideIndex = swiperWidget.previousIndex
        let buttonProps = getButtonProps(!autoplay)
        $("#play-button").html(buttonProps.text);
        $("#play-button").css('background-color', buttonProps.color);
        swiperWidget.slideTo(currentSlideIndex);
        autoplay ? await swiperWidget.autoplay.stop() : await swiperWidget.autoplay.start()
        autoplay = !autoplay

    });
}

getCoverSlide = () => {
    return $("<div/>", {
        class: "swiper-slide"
    }).append(
        $("<div/>", {})
            .append(
                $("<div/>", {
                    style: "text-align: center;"
                }).append(
                    $("<img/>", {
                        class: "logo",
                        src: "./images/om.png"
                    })
                )
            )
            .append(
                $("<h2/>", {
                    class: "title",
                    text: "Produtos"
                })
            )
            .append(
                $("<div/>", {
                    class: "linkContainer"
                }).append(
                    $("<a/>", {
                        href: "https://1cgeo.github.io/projetos/",
                        target: "_blank",
                        text: "Clique aqui para visualizar os Projetos em andamento.",
                        class: "link"
                    }).click(function (e) {
                        window.open(e.target.href);
                        return false;
                    })
                )
            )
    )
}

const getSectionSlide = (name) => {
    return $("<div/>", {
        id: 'section',
        class: "swiper-slide center title"
    }).append(
        $("<div/>", {

        })
            .append(
                $("<h2/>", {
                    text: name
                })
            )
    )
}

getSeperatorId = () => {
    return '-0-'
}

getSummarySlide = () => {
    let content = $("<div/>", {
        id: "summary",
        class: "swiper-slide"
    })
    let div = $("<div/>", {
        class: "description"
    })
    div.append(
        $("<h2/>", {
            class: "title",
            text: "Sumário"
        })
    )

    let groups = {}
    let subgroups = {}

    let projects = getProjectSettings()
    for (let projectName in projects) {
        let group
        if (!groups[projects[projectName].group]) {
            groups[projects[projectName].group] = $("<ul/>", {})
        }

        if (projects[projectName].subgroup && !subgroups[projects[projectName].subgroup]) {
            subgroups[projects[projectName].subgroup] = $("<li/>", {
                class: "group",
                text: projects[projectName].subgroup
            })
            groups[projects[projectName].group].append(subgroups[projects[projectName].subgroup])
        }

        group = projects[projectName].subgroup ? subgroups[projects[projectName].subgroup] : groups[projects[projectName].group]


        group.append(
            $("<ol/>", {})
                .append(
                    $("<a/>", {

                        href: "#"

                    })
                        .append(
                            $("<h3/>", {
                                id: `${projectName}${getSeperatorId()}${projects[projectName].lotes[0].name}`,
                                text: projects[projectName].title
                            })
                        )
                )
        )
    }

    let ulMain = $("<ul/>", {})

    for (let groupName of Object.keys(groups)) {
        ulMain.append(
            $("<li/>", {
                class: "group",
                text: groupName
            }).append(
                groups[groupName]
            )
        )
    }

    div.append(ulMain)

    return content.append(div)
}

geDefaultSlide = (slideId, title, description, subtitle, loteDescription) => {
    let content = $("<div/>", {
        id: slideId,
        class: "swiper-slide"
    })
    let div = $("<div/>", {
        class: "description"
    })
    div.append(
        $("<h2/>", {
            class: "title",
            text: title
        })
    )
    if (description) {
        div.append(
            $("<h4/>", {
                text: description
            })
        )
    }
    if (subtitle) {
        div.append(
            $("<h3/>", {
                class: "subtitle"
            }).append(
                $("<b/>", {
                    text: subtitle
                })
            )
        )
        div.append(
            $("<b/>", {
                text: loteDescription
            })
        )
    }
    div.append($("<br/>"))
    return content.append(div)
}

const filterSections = (projects) => {
    let groups = {}
    for (let projectName in projects) {
        let groupName = projects[projectName].group
        let group
        if (!groups[groupName]) {
            groups[groupName] = []
        }
        group = groups[groupName]
        let lotes = []
        for (let [idx, lote] of projects[projectName].lotes.entries()) {
            lotes.push({
                subgroup: projects[projectName].subgroup,
                slideId: `${projectName}${getSeperatorId()}${lote.name}`,
                title: projects[projectName].title,
                description: projects[projectName].description,
                subtitle: lote.subtitle,
                loteDescription: lote.description
            })
        }
        group.push(lotes)
    }
    return groups
}

const loadSection = (name, sectionSlides) => {
    $("#slides-content").append(getSectionSlide(name))
    let subgroupLoaded = []
    for (let lotes of sectionSlides) {
        let { subgroup } = lotes[0]
        if (subgroup && !subgroupLoaded.includes(subgroup)) {
            $("#slides-content").append(getSectionSlide(subgroup))
            subgroupLoaded.push(subgroup)
        }
        for (var idx = 0; idx < lotes.length; idx++) {
            let { slideId, title, description, subtitle, loteDescription } = lotes[idx]
            if (idx == 0) {
                $("#slides-content").append(
                    geDefaultSlide(slideId, title, description, subtitle, loteDescription)
                )
                continue
            }
            $("#slides-content").append(
                geDefaultSlide(slideId, title, null, subtitle, loteDescription)
            )
        }
    }
}

loadSlides = () => {
    $("#slides-content").append(getCoverSlide())
    $("#slides-content").append(getSummarySlide())
    let projects = getProjectSettings()
    let groups = filterSections(projects)
    for (let groupName of Object.keys(groups)) {
        loadSection(groupName, groups[groupName])
    }
}

stopLoader = () => {
    document.getElementById("loader").style.display = 'none'
}

const generatePopupHTML = (feature, topoDisplay, ortoDisplay, filteredEditionsTopo, filteredEditionsOrto) => {
    return `
    <div class="popup">
       <div style="text-align: center;">
            <h2>MI: ${feature.properties.identificadorMI}</h2>
            <h3>INOM: ${feature.properties.identificadorINOM}</h2>
            <h3 style="display:${(hideTopo && hideOrto) ? 'none' : ''};">Informação</h3>
       </div>
       <table>
            <tr>
                <th style="display:${topoDisplay};">Carta Topográfica</th>
                <th style="display:${ortoDisplay};">Carta Ortoimagem</th>
            </tr>
            <tr>
                <td style="display:${topoDisplay};">
                    ${filteredEditionsTopo.length == 0 ? `` : `
                    <table>
                        <tr>
                            <th>Edição</th>
                            <th>Data</th>
                        </tr>
                        ${filteredEditionsTopo.map((item, idx) => `
                        <tr>
                            <td>${filteredEditionsTopo.length - idx}</td>
                            <td>${item}</td>
                        </tr>`).join('\n')}
                    </table>
                    `}
                </td>
                <td  style="display:${ortoDisplay};">
                    ${filteredEditionsOrto.length == 0 ? `` : `
                    <table>
                        <tr>
                            <th>Edição</th>
                            <th>Data</th>
                        </tr>
                        ${filteredEditionsOrto.map((item, idx) => `
                        <tr>
                            <td>${filteredEditionsOrto.length - idx}</td>
                            <td>${item}</td>
                        </tr>`).join('\n')}
                    </table>
                    `}
                </td>
            </tr>
        </table>
    </div>`;
};

setProjectSettings = async () => {
    for (let projectName in PROJECTS) {
        let project = PROJECTS[projectName]
        if (project.group == "Situação Geral") {

            for (let lote of project.lotes) {
                let subtitleSetting = getSubtitleSetting(lote.legend, lote.name)
                let subtitleBorderColorSetting = getSubtitleBorderColorSetting(lote.legend, lote.name)

                lote.legend = subtitleSetting
                lote.legendOrto = subtitleBorderColorSetting

                lote.styles[0].paint['fill-color'] = [
                    'step', ['length', ['get', 'edicoes_topo']],  'rgba(255,255,255,0.0)',  // Tamanho do array = 0
                    1, 'rgba(145,207,96,0.5)', // Tamanho do array >= 1
                    2, 'rgba(102,178,255,0.5)' // Tamanho do array >= 2 
                ]
                lote.styles[1].paint['line-color'] = [
                    'step', ['length', ['get', 'edicoes_orto']],  '#121211',  // Tamanho do array = 0
                    1, 'rgba(145,207,96,1)', // Tamanho do array >= 1
                    2, 'rgba(102,178,255,1)' // Tamanho do array >= 2 
                ]
                lote.styles[1].paint['line-width'] = [
                    'step', ['length', ['get', 'edicoes_orto']],  0.5,  // Tamanho do array = 0
                    1, 5, // Tamanho do array >= 1
                    2, 5 // Tamanho do array >= 2 
                ]
                lote.styles[1].paint['line-offset'] = [
                    'step', ['length', ['get', 'edicoes_orto']],  1,  // Tamanho do array = 0
                    1, 3.5, // Tamanho do array >= 1
                    2, 3.5 // Tamanho do array >= 2 
                ]

                let yearInterval = await getYearInterval(lote.name)
                lote.yearInterval = yearInterval

            }
            continue
        }

        for (let lote of project.lotes) {
            let subtitleSetting = getSubtitleSetting(lote.legend, lote.name)
            lote.legend = subtitleSetting
            lote.styles[0].paint['fill-color'] = [
                'match', ['string', ['get', 'situacao']], ...subtitleSetting, '#AAAAAA'
            ]
            let yearInterval = await getYearInterval(lote.name)
            lote.yearInterval = yearInterval
        }

    }

    for (let projectName in PROJECTS) {
        let project = PROJECTS[projectName];
        for (let lote of project.lotes) {
            for (let style of lote.styles) {
                map.off('click', style.id);
                map.on('click', style.id, function (e) {
                    if (project.group == "Situação Geral") {
                        var editionsTopo = JSON.parse(e.features[0].properties.edicoes_topo);
                        var editionsOrto = JSON.parse(e.features[0].properties.edicoes_orto);
                        var filteredEditionsTopo = editionsTopo.filter(year => parseInt(year, 10) >= (yearFilter || 1900));
                        var filteredEditionsOrto = editionsOrto.filter(year => parseInt(year, 10) >= (yearFilter || 1900));
                        let topoDisplay = hideTopo ? 'none' : '';
                        let ortoDisplay = hideOrto ? 'none' : '';
                        let popupHTML = generatePopupHTML(e.features[0], topoDisplay, ortoDisplay, filteredEditionsTopo, filteredEditionsOrto);
                        new maplibregl.Popup({
                            maxWidth: '350px'
                        })
                        .setLngLat(e.lngLat)
                        .setHTML(popupHTML)
                        .addTo(map);
    
                        return;
                    }
                    new maplibregl.Popup()
                        .setLngLat(e.lngLat)
                        .setHTML(`
                        <div class="popup">
                           <div style="text-align: center;">
                                <h2>MI: ${e.features[0].properties.identificadorMI}</h2>
                                <h3>INOM: ${e.features[0].properties.identificadorINOM}</h2>
                           </div>
                        <div/>
                        `)
                        .addTo(map);
                });
            }
        }
    }
    sessionStorage.setItem('PROJECTS', JSON.stringify(PROJECTS))
}

getSubtitleSetting = (legend, name) => {
    let subtitleSetting = []
    for (let legendId of legend) {
        state = SUBTITLE_STATES.find(item => item.id == legendId)
        if (!state) continue
        subtitleSetting.push(state.name, state.color)
    }
    return subtitleSetting
}

getSubtitleBorderColorSetting = (legend, name) => {
    let subtitleSetting = []
    for (let legendId of legend) {
        state = SUBTITLE_STATES_BORDER.find(item => item.id == legendId)
        if (!state) continue
        subtitleSetting.push(state.name, state.color)
    }
    return subtitleSetting
}

getYearInterval = async (name) => {
    let minYear = Infinity;
    let maxYear = -Infinity;
    let resp = await fetch(`./data/${name}.geojson`);
    let data = await resp.json();
    for (let i = data.features.length; i > 0; i--) {
        let feature = data.features[i - 1];
        if (!("edicoes_orto" in feature.properties) || !("edicoes_topo" in feature.properties)) {
            continue;
        }

        let edicoesOrto = feature.properties.edicoes_orto;
        let edicoesTopo = feature.properties.edicoes_topo;

        let allEditions = [...edicoesOrto, ...edicoesTopo];
        for (let edition of allEditions) {
            let year = parseInt(edition, 10);
            if (!isNaN(year)) {
                if (year < minYear) {
                    minYear = year;
                }
                if (year > maxYear) {
                    maxYear = year;
                }
            }
        }
    }
    let interval = {
        min: 1900,
        max: 2200
    };

    if (minYear !== Infinity) {
        interval.min = minYear;
    }
    if (maxYear !== -Infinity) {
        interval.max = maxYear;
    }
    return {
        ...interval
    };
}

getProjectSettings = () => {
    return JSON.parse(sessionStorage.getItem('PROJECTS'))
}

const loadQuery = () => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    let slideIdx = params.slide
    if (!hasSlideIndex(slideIdx)) return
    swiperWidget.slideTo(
        slideIdx,
        0
    );

}


main = async () => {
    await setProjectSettings()
    loadSlides()
    connectEvents()
    setTimeout(() => {
        stopLoader()
        loadQuery()
    }, 2000)
}

main()