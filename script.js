window.addEventListener("load", () => {
	const canvas = document.getElementById("canvas");
	const context = canvas.getContext("2d");
	const randomizeButton = document.getElementById("randomizeBtn");

	//canvas settings
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	context.lineCap = "round";
	context.shadowColor = "rgba(0,0,0,0.7)";
	context.shadowOffsetX = 10;
	context.shadowOffsetY = 5;
	context.shadowBlur = 10;

	//canvas center
	const cx = canvas.width / 2;
	const cy = canvas.height / 2;

	//effect settings
	const effect = {
		size: Math.min(canvas.width, canvas.height) * 0.25,
		maxDepth: 4,
		branches: 2,
		sides: 5,
		spread: 0.5,
		scale: 0.7,
		color: `hsl(${Math.random() * (360 - 0) - 0}, 100%, 50%)`,
		lineWidth: Math.floor(Math.random() * 20 - 10),
	};

	function drawBranch(depth) {
		if (depth > effect.maxDepth) return;

		for (let i = 0; i < effect.branches; i++) {
			context.save();
			drawLine(0, 0);
			doTransformations(
				effect.size - (effect.size / effect.branches) * i,
				0,
				effect.spread,
				effect.scale,
				effect.scale
			);
			drawBranch(depth + 1);
			context.restore();
			context.save();
			drawLine(0, 0);
			doTransformations(
				effect.size - (effect.size / effect.branches) * i,
				0,
				-effect.spread,
				effect.scale,
				effect.scale
			);
			drawBranch(depth + 1);
			context.restore();
		}
	}

	function drawFractal() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.save();
		context.lineWidth = effect.lineWidth;
		context.strokeStyle = effect.color;
		context.translate(cx, cy);
		for (let i = 0; i < effect.sides; i++) {
			context.rotate((Math.PI * 2) / effect.sides);
			drawBranch(0);
		}
		context.restore();
	}

	function drawLine(x, y) {
		context.beginPath();
		context.moveTo(x, y);
		context.lineTo(effect.size, 0);
		context.stroke();
	}

	function doTransformations(tx, ty, angle, sx, sy) {
		context.translate(tx, ty);
		context.rotate(angle);
		context.scale(sx, sy);
	}

	function randomizeFractals() {
		effect.sides = Math.floor(Math.random() * 7 + 2);
		effect.scale = Math.random() * 0.2 + 0.4;
		effect.spread = Math.random() * 2.9 + 0.1;
		effect.color = `hsl(${Math.random() * (360 - 0) - 0}, 100%, 50%)`;
		effect.lineWidth = Math.floor(Math.random() * 20 - 10);
	}

	randomizeButton.addEventListener("click", () => {
		randomizeFractals();
		drawFractal();
	});
	drawFractal();
});
