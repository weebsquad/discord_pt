const updateLinkLabel = async () => {
	const label = document.getElementById('url-string');
	if (!label || location.hostname === 'localhost' || location.hostname === '127.0.0.1') return;

	try {
		const response = await fetch('/a/string');
		if (!response.ok) return;
		const result = await response.json();
		if (typeof result.string === 'string' && result.string.length > 0) {
			label.textContent = result.string;
		}
	} catch {
		// Keep the local fallback label when the optional text endpoint is unavailable.
	}
};

const setupRedirectPrank = () => {
	const bar = document.getElementById('progress-fill');
	const percent = document.getElementById('redirect-percent');
	const status = document.getElementById('redirect-status');
	const button = document.getElementById('redirect-trigger');
	const zone = document.getElementById('redirect-button-zone');
	if (!bar || !percent || !status || !button || !zone) return;

	const messages = [
		'Asking Portugal for permission…',
		'Negotiating with the loading bar…',
		'Checking if this counts as a website…',
		'Please hold. The hold music is imaginary…',
		'Almost somewhere…',
		'Recalculating the route to nowhere…',
		'Your request is important to somebody…',
		'Waiting for a very small wheel to spin…',
	];
	const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	let progress = 8;
	let escapeCount = 0;
	let isRunning = false;
	let pinned = false;

	button.addEventListener('focus', () => {
		pinned = true;
	});

	button.addEventListener('pointerenter', (event) => {
		if (event.pointerType !== 'mouse' || reducedMotion || pinned || isRunning || escapeCount >= 3) return;

		const zoneBounds = zone.getBoundingClientRect();
		const maxLeft = Math.max(0, zone.clientWidth - button.offsetWidth);
		const maxTop = Math.max(0, zone.clientHeight - button.offsetHeight);
		if (maxLeft === 0 && maxTop === 0) return;

		const pointerX = event.clientX - zoneBounds.left;
		const pointerY = event.clientY - zoneBounds.top;
		const positions = [
			{ left: 0, top: 0 },
			{ left: maxLeft, top: 0 },
			{ left: 0, top: maxTop },
			{ left: maxLeft, top: maxTop },
		];
		const scored = positions.map((position) => {
			const dx = Math.max(position.left - pointerX, 0, pointerX - (position.left + button.offsetWidth));
			const dy = Math.max(position.top - pointerY, 0, pointerY - (position.top + button.offsetHeight));
			return { ...position, distance: Math.hypot(dx, dy) };
		});
		const farthest = Math.max(...scored.map((position) => position.distance));
		const candidates = scored.filter((position) => position.distance >= farthest - 12);
		const target = candidates[Math.floor(Math.random() * candidates.length)];
		escapeCount += 1;
		button.style.left = `${target.left}px`;
		button.style.top = `${target.top}px`;
		button.style.transform = 'none';
	});

	const tick = () => {
		if (!isRunning) return;

		const goesBackward = Math.random() < 0.24;
		const change = Math.floor(Math.random() * 13) + 2;
		progress = goesBackward
			? Math.max(3, progress - change)
			: Math.min(96, progress + change);

		bar.style.width = `${progress}%`;
		percent.textContent = `${String(progress).padStart(2, '0')}%`;
		status.textContent = goesBackward
			? 'Oops. We appear to be less redirected now…'
			: messages[Math.floor(Math.random() * messages.length)];
		window.setTimeout(tick, 550 + Math.floor(Math.random() * 950));
	};

	button.addEventListener('click', () => {
		if (isRunning) return;
		isRunning = true;
		button.classList.add('is-running');
		bar.style.width = `${progress}%`;
		percent.textContent = `${String(progress).padStart(2, '0')}%`;
		status.textContent = 'Request received. Waiting for Portugal’s approval…';
		window.setTimeout(tick, 700);
	});
};

updateLinkLabel();
setupRedirectPrank();
