document.getElementById('washBtn').addEventListener('click', () => {
  document.getElementById('optionid').disabled = false; // Enable washing options
});

document.getElementById('dryBtn').addEventListener('click', () => {
  const optionSelect = document.getElementById('optionid');
  optionSelect.value = 'N';
  optionSelect.disabled = true; // Disable washing options
});

// Modal Elements
const notificationModal = document.getElementById('notificationModal');
const notificationMessage = document.getElementById('notificationMessage');
const closeModalButton = document.getElementById('closeModal');

// Function to show modal
function showModal(message) {
  notificationMessage.textContent = message;
  notificationModal.classList.remove('hidden');
  notificationModal.classList.add('active');
}

// Function to hide modal
function hideModal() {
  notificationModal.classList.remove('active');
  notificationModal.classList.add('hidden');
}

// Close modal on button click
closeModalButton.addEventListener('click', hideModal);

// Example usage in form submission
document.getElementById('laundryForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const payload = {
    shopid: document.getElementById('shopid').value,
    macid: document.getElementById('macid').value,
    cusid: "966",
    optionid: document.getElementById('optionid').value,
    macprice: parseInt(document.getElementById('macprice').value),
    macpaid: parseInt(document.getElementById('macprice').value),
    spay: parseInt(document.getElementById('macprice').value),
    scre: 0,
    bcre: 0,
    gpay: 0,
    midnight: 0,
  };

  console.log("Submitting:", payload);

  // Show loading notification
  showModal('Processing your payment...');

  fetch('/api/wash/payment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      showModal('การชำระเงินเสร็จสิ้น! 🚀Telegram Contacts:@bishak420');
    })
    .catch((error) => {
      console.error('Error:', error);
      showModal('การชำระเงินผิดพลาด! โปรดลองอีกครั้ง.');
    });
});
// Rocket Animation Elements
const rocketAnimationContainer = document.getElementById('rocketAnimation');

// Function to generate rockets
function createRocket() {
  const rocket = document.createElement('span');
  rocket.classList.add('rocket');
  rocket.textContent = '🤑💰';

  // Randomize position and speed
  const size = Math.random() * 1.5 + 1; // Rocket size between 1rem and 2.5rem
  const left = Math.random() * 100; // Random horizontal position
  const duration = Math.random() * 2 + 3; // Duration between 3s and 5s

  rocket.style.fontSize = `${size}rem`;
  rocket.style.left = `${left}%`;
  rocket.style.animationDuration = `${duration}s`;

  rocketAnimationContainer.appendChild(rocket);

  // Remove the rocket after animation ends
  setTimeout(() => {
    rocket.remove();
  }, duration * 1000);
}

// Function to start rocket animation
function startRocketAnimation() {
  // Generate rockets every 300ms
  const interval = setInterval(() => {
    createRocket();
  }, 300);

  // Stop rockets after modal closes
  return interval;
}

// Function to stop rocket animation
function stopRocketAnimation(interval) {
  clearInterval(interval);
  rocketAnimationContainer.innerHTML = ''; // Clear all existing rockets
}

// Modified showModal function
function showModal(message) {
  notificationMessage.textContent = message;
  notificationModal.classList.remove('hidden');
  notificationModal.classList.add('active');

  // Start rocket animations
  const rocketInterval = startRocketAnimation();

  // Attach the interval ID to the modal so we can stop it later
  notificationModal.dataset.rocketInterval = rocketInterval;
}

// Modified hideModal function
function hideModal() {
  notificationModal.classList.remove('active');
  notificationModal.classList.add('hidden');

  // Stop rocket animations
  const rocketInterval = notificationModal.dataset.rocketInterval;
  stopRocketAnimation(rocketInterval);
}
