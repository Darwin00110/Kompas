function config_mapa(){
            let mapa = document.createElement("div")
            mapa.id = "map"
            document.getElementById("container").appendChild(mapa)
            setTimeout(() => {
                mapa.style.opacity = "100%"
            }, 10);
            const map = L.map('map').setView([0, 0], 13);
        // Usa OpenStreetMap como base
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);

            // Tenta pegar a localização do usuário em tempo real
            if (navigator.geolocation) {
                navigator.geolocation.watchPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        map.setView([latitude, longitude], 15); // Zoom 15 (rua)

                        // Adiciona um marcador
                        L.marker([latitude, longitude])
                            .addTo(map)
                            .bindPopup("Você está aqui!")
                            .openPopup();
                    },
                    (error) => {
                        alert("Erro ao obter localização: " + error.message);
                    },
                    { enableHighAccuracy: true } // GPS preciso
                );
            } else {
                alert("Seu navegador não suporta geolocalização.");
            }
        }

        function digitar(textoElemento, texto, i = 0) {
            return new Promise(resolve => {
            function escrever() {
            if (i < texto.length) {
                textoElemento.textContent += texto.charAt(i);
                i++;
                setTimeout(escrever, 12);
            } else {
                resolve(); 
            }
          }
         escrever();
         });
        }


        function apresentacao(){
            let div = document.createElement("div")
            div.style.position = "relative"
            div.style.display = "grid"
            div.id = "div"
            div.style.transition = "2s opacity"
            div.style.gridTemplateRows = "60% 40%"
            div.style.gridColumn = 3
            div.style.top = "-10mm"
            div.style.height = "40mm"
            div.style.display = "grid"
            div.style.backgroundColor = "rgba(0, 0, 0, 0.6)"
            div.style.gridTemplateColumns = "3mm 93mm 3mm"
            div.style.zIndex = 1
            let svg01 = document.createElementNS("http://www.w3.org/2000/svg", "svg")
            svg01.setAttribute("width", "150")
            svg01.setAttribute("height", "60")
            svg01.style.transition = "transform 1.5s"
            let linha01 = document.createElementNS("http://www.w3.org/2000/svg", "path")
            linha01.setAttribute("d", "M0 10 Q0 10 150 10")
            linha01.setAttribute("stroke", "green")
            linha01.setAttribute("fill", "transparent")
            linha01.setAttribute("stroke-width", "4")

            svg01.append(linha01)
            div.append(svg01)
            document.getElementById("container").appendChild(div)
            svg01.style.rotate = "90deg"
            svg01.style.gridColumn = 1
            svg01.style.position = "relative"
            svg01.style.transform = "translate(12mm, -21.5mm)"
            //temporario
            svg01.className = "linha01"
            
            let svg02 = document.createElementNS("http://www.w3.org/2000/svg", "svg")
            svg02.setAttribute("width", "150")
            svg02.setAttribute("height", "60")
            svg02.style.transition = "transform 1.5s"
            let linha02 = document.createElementNS("http://www.w3.org/2000/svg", "path")
            linha02.setAttribute("d", "M0 10 Q0 10 150 10")
            linha02.setAttribute("stroke", "green")
            linha02.setAttribute("fill", "transparent")
            linha02.setAttribute("stroke-width", "4")
            
            svg02.append(linha02)
            div.appendChild(svg02)

            svg02.style.rotate = "90deg"
            svg02.className = "linha02"
            svg02.style.transform = "translate(12mm, -21.5mm)"
            
            svg01.style.transition = "transform 1.2s"
            svg02.style.transition = "transform 1.2s"

            setTimeout(() => {
                svg01.style.transform = "translate(12mm, 24mm)"
                svg02.style.transform = "translate(12mm, -71mm)"
            }, 1000);
            setTimeout(async () => {
                let texto = document.createElement("p")
                texto.style.gridColumn = 2
                texto.style.id = 'Mucho'
                texto.className = "texto"
                texto.style.transition = "opacity 1s"
                texto.style.position = "relative"
                texto.style.top = "-18mm"
                let mensagem = "Ola seja bem vindo ao Kompas um site onde visa saber a localização de um dispositivo com base em seu endereço IP, O uso do site tem que passar por uma verificação para fins de segurança e proteção de nossos usuarios para que nenhum individuo mal intencionado venha a usar a ferramenta para atividade ilegais"
                div.append(texto)
                await digitar(texto, mensagem)
                function config_bottao(){
                    function config(){
                        svg01.style.transform = "translate(12mm, -23mm)";
                        svg02.style.transform = "translate(12mm, -23mm)";
                        setTimeout(() => {
                            div.style.opacity = "0%"
                            texto.style.opacity = "0%"
                            bottao.style.opacity = "0%"
                            setTimeout(() => {
                                document.getElementById("div").remove()
                                config_principal()
                            }, 2000);
                        }, 10);
                    }
                    bottao.textContent = "Fechar"
                    texto.textContent = ""
                    mensagem = "Como é uma versão beta não há necessidade de fazer o cadastro espero que tenha gostado da ideia :)"
                    digitar(texto, mensagem)
                    bottao.onclick = config
                }
                let bottao = document.createElement("button")
                bottao.style.opacity = "0%"
                bottao.style.border = "2px solid green"
                bottao.style.borderRadius = "6px"
                bottao.textContent = "Entendi"
                bottao.style.width = "30mm"
                bottao.style.height = "6mm"
                bottao.style.position = "relative"
                bottao.style.left = "64mm"
                bottao.style.color = "green"
                bottao.style.transition = "0.5s opacity"
                bottao.style.gridRow = 2
                bottao.style.marginTop = "8mm"    
                bottao.style.backgroundColor = "rgba(0, 0, 0, 0.6)"
                bottao.onclick = config_bottao
                async function verificacao(){
                    if(texto.textContent == mensagem){
                        setTimeout(() => {
                            bottao.style.opacity = "100%"
                        }, 800);
                    }
                }
                verificacao()
                div.append(bottao)
            }, 2000);
        }

        function config_principal(){
            setTimeout(() => {
                document.getElementById("pupila").style.transform = "translate(-37px, 0px)"
                setTimeout(() => {
                    document.getElementById("pupila").style.transform = "translate(40px, 0px)"
                    setTimeout(() => {
                        document.getElementById("pupila").style.transform = "translate(0px, 0px)"
                        setTimeout(() => {
                            gsap.to("#linha01", {
                                duration: 1.5,
                                attr: { d: "M10 30 Q0 30 190 30" },
                                stroke: "green",
                                ease: "power1.inOut"
                            });

                            gsap.to("#linha02", {
                                duration: 1.5,
                                attr: { d: "M10 30 Q0 30 190 30" },
                                stroke: "green",
                                ease: "power1.inOut"
                            });
                            document.getElementById("parteBaixo").style.top = "2mm"
                            setTimeout(() => {
                                document.getElementById("parteCima").style.rotate = "-90deg"
                                document.getElementById("parteBaixo").style.rotate = "-90deg"
                                setTimeout(() => {
                                    document.getElementById("parteCima").style.transform = "translate(-6mm, -4mm)"
                                    document.getElementById("parteBaixo").style.transform = "translate(11mm, 7mm)"
                                    document.getElementById("pupila").style.border = "3px solid blue"
                                    setTimeout(() => {
                                        config_ip_iluster()
                                    }, 1000);
                                }, 1000);
                        }, 1000);   
                        }, 1000);
                    }, 1500);
                }, 1500);
            }, 1500);
        }
        function teste(){
            fetch("https://api.ipify.org?format=json")
            .then(response => response.json())
            .then(data => {
                const IP = data['ip']
                fetch(`https://ipinfo.io/${IP}?token=c8e52fd819216e`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)   
                })
                .catch(error => {
                    console.error("Erro na consulta da API_02", error)
                })
            })

            .catch(error => {
                console.error("Erro na coleta de dados da API_01", error)
            })
        }

        function config_API(){
            fetch("https://api.ipify.org?format=text")
            .then(response => response.text())
            .then(data => {
                const ip = data
                fetch(`https://ipinfo.io/${ip}?token=c8e52fd819216e`)
                .then(response => response.json())
                .then(data => {
                    let ip_iluster = document.getElementById("ip_iluster")
                    let ip = document.createElement("p")
                    ip.textContent = `${data['ip']}`
                    ip.style.position = "relative"
                    ip.style.gridColumn = 3
                    ip.style.gridRow = 1
                    ip.style.top = "8%"
                    ip.style.transition = "opacity 0.5s"
                    ip.style.opacity = "0%"

                    let hostname = document.createElement("p")
                    hostname.textContent = `${data['hostname']}`
                    hostname.style.position = "relative"
                    hostname.style.top = "24%"
                    hostname.style.gridColumn = 3
                    hostname.style.gridRow = 1
                    hostname.style.fontSize = "12px"
                    hostname.style.whiteSpace = "nowrap"
                    hostname.style.transition = "opacity 0.5s"
                    hostname.style.opacity = "0%"


                    let city = document.createElement("p")
                    city.textContent = `${data['city']}`
                    city.style.position = "relative"
                    city.style.top = "36%"
                    city.style.gridColumn = 3
                    city.style.gridRow = 1
                    city.style.whiteSpace = "nowrap"
                    city.style.transition = "opacity 0.5s"
                    city.style.opacity = "0%"


                    let region = document.createElement("p")
                    region.textContent = `${data['region']}`
                    region.style.position = "relative"
                    region.style.top = "50%"
                    region.style.gridColumn = 3
                    region.style.gridRow = 1
                    region.style.whiteSpace = "nowrap"
                    region.style.transition = "opacity 0.5s"
                    region.style.opacity = "0%"


                    let country = document.createElement("p")
                    country.textContent = `${data['country']}`
                    country.style.position = "relative"
                    country.style.top = "65%"
                    country.style.gridColumn = 3
                    country.style.gridRow = 1
                    country.style.whiteSpace = "nowrap"
                    country.style.transition = "opacity 0.5s"
                    country.style.opacity = "0%"


                    let loc = document.createElement("p")
                    loc.textContent = `${data['loc']}`
                    loc.style.gridColumn = 3
                    loc.style.gridRow = 1
                    loc.style.whiteSpace = "nowrap"
                    loc.style.top = "79%"
                    loc.style.position = "relative"
                    loc.style.transition = "opacity 0.5s"
                    loc.style.opacity = "0%"


                    let org = document.createElement("p")
                    org.style.position = "relative"
                    org.style.gridRow = 1
                    org.style.gridColumn = 3
                    org.textContent = `${data['org']}`
                    org.style.top = "92%"
                    org.style.whiteSpace = "nowrap"
                    org.style.transition = "opacity 0.5s"
                    org.style.opacity = "0%"


                    let postal = document.createElement("p")
                    postal.style.position = "relative"
                    postal.style.gridRow = 1
                    postal.style.gridColumn = 3
                    postal.style.top = "106%"
                    postal.textContent = `${data['postal']}`
                    postal.style.transition = "opacity 0.5s"
                    postal.style.opacity = "0%"

                    let fuso_horario = document.createElement("p")
                    fuso_horario.style.position = "relative"
                    fuso_horario.textContent = `${data['timezone']}`
                    fuso_horario.style.gridColumn = 3
                    fuso_horario.style.gridRow = 1
                    fuso_horario.style.top = "119%"
                    fuso_horario.style.whiteSpace = "nowrap"
                    fuso_horario.style.transition = "opacity 0.5s"
                    fuso_horario.style.opacity = "0%"


                    ip_iluster.append(ip)
                    ip_iluster.append(hostname)
                    ip_iluster.append(city)
                    ip_iluster.append(region)
                    ip_iluster.append(country)
                    ip_iluster.append(loc)
                    ip_iluster.append(org)
                    ip_iluster.append(postal)
                    ip_iluster.append(fuso_horario)

                    setTimeout(() => {
                        ip.style.opacity = "100%"
                        country.style.opacity = "100%"
                        city.style.opacity = "100%"
                        loc.style.opacity = "100%"
                        hostname.style.opacity = "100%"
                        region.style.opacity = "100%"
                        org.style.opacity = "100%"
                        postal.style.opacity = "100%"
                        fuso_horario.style.opacity = "100%"
                        config_mapa()
                    }, 1000);
                })
                .catch(error => {
                    console.log("Erro na consulta da API:", error)
                })
            })
            .catch(error => {
                console.error("Erro na API", error)
            })
        }

        function config_ip_iluster(){
            let container = document.getElementById("container")

            let ip_iluster = document.createElement("div")
            ip_iluster.className = "ip_ilustrer"
            ip_iluster.id = "ip_iluster"

            let svg01 = document.createElementNS("http://www.w3.org/2000/svg", "svg")
            let linha01 = document.createElementNS("http://www.w3.org/2000/svg", "path")
            
            let svg02 = document.createElementNS("http://www.w3.org/2000/svg", "svg")
            let linha02 = document.createElementNS("http://www.w3.org/2000/svg", "path")

            svg01.setAttribute("width", "375")
            svg01.setAttribute("height", "50")

            linha01.setAttribute("d", "M0 30 Q0 30 375 30")
            linha01.setAttribute("stroke", "green")
            linha01.setAttribute("fill", "transparent")
            linha01.setAttribute("stroke-width", "7")

            svg02.setAttribute("width", "375")
            svg02.setAttribute("height", "50")

            linha02.setAttribute("d", "M0 10 Q130 9 375 10")
            linha02.setAttribute("stroke", "green")
            linha02.setAttribute("fill", "transparent")
            linha02.setAttribute("stroke-width", "7")

            svg01.setAttribute("class", "line_ip_iluster")
            svg02.setAttribute("class", "line_ip_iluster2")
            svg01.append(linha01)
            svg02.append(linha02)
            ip_iluster.appendChild(svg01)
            ip_iluster.appendChild(svg02)
            container.appendChild(ip_iluster)
            setTimeout(() => {
                ip_iluster.style.opacity = "100%"
                svg01.style.transform = "translate(0mm, -68mm)"
                svg02.style.transform = "translate(0mm, 77mm)"
                ip_iluster.style.gridTemplateColumns = "8mm 29mm 30mm"
                setTimeout(() => {
                    document.querySelector(".ip_ilustrer").style.background = " rgba(0, 0, 0, 0.5)"
                    let ip_text = document.createElement("p")
                    ip_text.textContent = "IP:"
                    ip_text.style.position = "relative"
                    ip_text.style.gridColumn = 2
                    ip_text.style.gridRow = 1
                    ip_text.style.top = "8%"
                    ip_text.style.gap = "20mm"
                    ip_text.style.color = "cyan"

                    let hostname_text = document.createElement("p")
                    hostname_text.textContent = "Nome do host:"
                    hostname_text.style.position = "relative"
                    hostname_text.style.top = "22%"
                    hostname_text.style.gridColumn = 2
                    hostname_text.style.gridRow = 1
                    hostname_text.style.whiteSpace = "nowrap"
                    hostname_text.style.color = "cyan"

                    let city_text = document.createElement("p")
                    city_text.textContent = "Cidade:"
                    city_text.style.position = "relative"
                    city_text.style.top = "36%"
                    city_text.style.gridColumn = 2
                    city_text.style.gridRow = 1
                    city_text.style.whiteSpace = "nowrap"
                    city_text.style.color = "cyan"

                    let region_text = document.createElement("p")
                    region_text.textContent = "Região:"
                    region_text.style.position = "relative"
                    region_text.style.top = "50%"
                    region_text.style.gridColumn = 2
                    region_text.style.gridRow = 1
                    region_text.style.whiteSpace = "nowrap"
                    region_text.style.color = "cyan"

                    let country_text = document.createElement("p")
                    country_text.textContent = "Pais:"
                    country_text.style.position = "relative"
                    country_text.style.top = "65%"
                    country_text.style.gridColumn = 2
                    country_text.style.gridRow = 1
                    country_text.style.whiteSpace = "nowrap"
                    country_text.style.color = "cyan"

                    let loc_text = document.createElement("p")
                    loc_text.textContent = "Localização:"
                    loc_text.style.gridColumn = 2
                    loc_text.style.gridRow = 1
                    loc_text.style.whiteSpace = "nowrap"
                    loc_text.style.top = "79%"
                    loc_text.style.position = "relative"
                    loc_text.style.color = "cyan"

                    let org_text = document.createElement("p")
                    org_text.style.position = "relative"
                    org_text.style.gridRow = 1
                    org_text.style.gridColumn = 2
                    org_text.textContent = "Org:"
                    org_text.style.top = "92%"
                    org_text.style.color = "cyan"

                    let postal_text = document.createElement("p")
                    postal_text.style.position = "relative"
                    postal_text.style.gridRow = 1
                    postal_text.style.gridColumn = 2
                    postal_text.style.top = "106%"
                    postal_text.textContent = "Postal:"
                    postal_text.style.color = "cyan"

                    let fuso_horario_text = document.createElement("p")
                    fuso_horario_text.style.position = "relative"
                    fuso_horario_text.textContent = "Fuso horario:"
                    fuso_horario_text.style.gridColumn = 2
                    fuso_horario_text.style.gridRow = 1
                    fuso_horario_text.style.top = "119%"
                    fuso_horario_text.style.whiteSpace = "nowrap"
                    fuso_horario_text.style.color = "cyan"

                    ip_iluster.append(ip_text)
                    ip_iluster.append(hostname_text)
                    ip_iluster.append(city_text)
                    ip_iluster.append(region_text)
                    ip_iluster.append(country_text)
                    ip_iluster.append(loc_text)
                    ip_iluster.append(org_text)
                    ip_iluster.append(postal_text)
                    ip_iluster.append(fuso_horario_text)
                    config_API()
                }, 1000);
            }, 1000);

        }

        addEventListener("DOMContentLoaded", () => {
            apresentacao()
        })