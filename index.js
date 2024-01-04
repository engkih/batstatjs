window.onload = main;

function main() {
	const batStat = document.getElementById("cstatus");
	const batLevel = document.getElementById("blevel");
	const chargeTime = document.getElementById("ctime");
	const dischargeTime = document.getElementById("dtime");

	navigator.getBattery().then((batt) => {	
		// Initial value setter
		updateBatStat();
		updateChargingTime();
		updateDischargingTime();

		batLevel.textContent = batt.level*100+"%";
		

		// Listening to charging status event change then update using updateBatStat()
		batt.addEventListener("chargingchange", () => {
			updateBatStat();
		});

		function updateBatStat() {
			if (batt.charging) {
				batStat.textContent = "Charging."
				chargeTime.textContent = "Calculating...."
			}
			else if (!batt.charging) {
				batStat.textContent = "Discharging."
				dischargeTime.textContent = "Calculating...."
			}
		}

		// Listening to battery level and update every change.
		batt.addEventListener("levelchange", () => {
			batLevel.textContent = batt.level*100+"%";
		});


		// Listening to charging time event change then update using updateChargingTime().
		batt.addEventListener("chargingtimechange", () => {
			updateChargingTime()
		});

		function updateChargingTime() {
			if (batt.chargingTime == Infinity) {
				chargeTime.textContent = "Not Charging."
			}
			else if (batt.chargingTime != Infinity) {
				chargeTime.textContent = Math.round(batt.chargingTime / 60) + " minutes.";
			}
		};
		
		// Listening to discharging time event change then update using updateDischargingTime().
		batt.addEventListener("dischargingtimechange", () => {
			updateDischargingTime();
		});

		function updateDischargingTime() {
			if (batt.dischargingTime == Infinity) {
				dischargeTime.textContent = "Battery is charging.";
			}
			if (batt.dischargingTime != Infinity) {
				const dischTime = Math.round(batt.dischargingTime/60);
				const dischTimeTextM = dischTime + " minutes."
				if (dischTime > 59) {
					const dischTimeHour = Math.round(dischTime/60);
					const dischTimeMinute = dischTime%60;
				dischargeTime.textContent = dischTimeHour  + " hours, " + dischTimeMinute + " minutes.";
			}
		}
		};
			
	});

}
