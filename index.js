window.onload = main;

function main() {
	const batStat = document.getElementById("cstatus");

	navigator.getBattery().then((batt) => {
		console.log(batt)
	
		// Initial value setter
		if (batt.charging) {
			batStat.textContent = "Charging"
		}
		else if (!batt.charging) {
			batStat.textContent = "Discharging"
		}

		// Listening to charging status event change then update using updateBatStat()
		batt.addEventListener("chargingchange", () => {
			console.log(batt.charging)
			updateBatStat();
		});

		function updateBatStat() {
			if (batt.charging) {
				batStat.textContent = "Charging"
			}
			else if (!batt.charging) {
				batStat.textContent = "Discharging"
			}
		}
	});

}
