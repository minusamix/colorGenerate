window.onload = () => {
	let input = document.querySelectorAll('input');
	const canvas = document.querySelector('.canvas');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	const ctx = canvas.getContext('2d');


	const fileInput = document.querySelector('.fileInput');
	let img = new Image();
	img.crossOrigin = "anonymous";
	fileInput.onchange = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {

				img.src = e.target.result;
				img.name = img.src.filename();
				ctx.drawImage(img, 0, 0);
			};
			reader.readAsDataURL(file);
		}
	};



	for (let i = 0; i < input.length; i++) {
		input[i].oninput = () => {
			let red, green, blue;
			red = document.querySelector('.red').value.toString();
			if (red.length < 2) {
				red = '0' + red;
			}
			green = document.querySelector('.green').value.toString();
			if (green.length < 2) {
				green = '0' + green;
			}
			blue = document.querySelector('.blue').value.toString();
			if (blue.length < 2) {
				blue = '0' + blue;
			}
			let rgb = `rgb(${red},${green},${blue})`;
			ctx.fillStyle = rgb;
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.drawImage(img, 0, 0);
		}
	}
	let showBtn = document.querySelector('.showPreview');
	showBtn.onclick = () => {
		const dataUrl = canvas.toDataURL('image/png');
		const image = new Image();
		image.src = dataUrl;
		const link = document.createElement('a');
		link.download = img.name;
		if (document.querySelector('.preview').querySelector('a')) {
			document.querySelector('.preview a').href = dataUrl;
		} else {
			link.href = dataUrl;
			document.querySelector('.preview').appendChild(link);
		}
		if (document.querySelector('.preview a').querySelector('img')) {
			document.querySelector('.preview a img').src = dataUrl;
		} else {
			document.querySelector('.preview a').appendChild(image);
		}
	}

}

String.prototype.filename = function (extension) {
	var s = this.replace(/\\/g, '/');
	s = s.substring(s.lastIndexOf('/') + 1);
	return extension ? s.replace(/[?#].+$/, '') : s.split('.')[0];
}
