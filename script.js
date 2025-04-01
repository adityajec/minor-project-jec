 // Tab Navigation
 const tabs = document.querySelectorAll('.tab');
 const sections = document.querySelectorAll('.section');
 
 tabs.forEach(tab => {
     tab.addEventListener('click', () => {
         const target = tab.dataset.tab;
         
         // Update active tab
         tabs.forEach(t => t.classList.remove('active'));
         tab.classList.add('active');
         
         // Show corresponding section
         sections.forEach(section => {
             section.classList.remove('active');
             if (section.id === target) {
                 section.classList.add('active');
             }
         });
     });
 });
 
 // Pain Level Selection
 const painButtons = document.querySelectorAll('.pain-button');
 const painFill = document.getElementById('pain-fill');
 const painValue = document.getElementById('pain-value');
 let currentPain = 0;
 
 painButtons.forEach(button => {
     button.addEventListener('click', () => {
         const value = parseInt(button.dataset.value);
         currentPain = value;
         
         // Update UI
         painFill.style.width = `${value * 10}%`;
         painValue.textContent = value;
         
         // Update active button
         painButtons.forEach(btn => btn.classList.remove('active'));
         button.classList.add('active');
     });
 });
 
 // Chatbot
 const chatMessages = document.getElementById('chat-messages');
 const chatInput = document.getElementById('chat-input-field');
 const sendButton = document.getElementById('send-message');
 
 sendButton.addEventListener('click', sendChatMessage);
 chatInput.addEventListener('keypress', (e) => {
     if (e.key === 'Enter') {
         sendChatMessage();
     }
 });
 
 function sendChatMessage() {
     const message = chatInput.value.trim();
     if (!message) return;
     
     // Add user message
     addMessage('user', message);
     chatInput.value = '';
     
     // Simulate bot response
     setTimeout(() => {
         let response;
         if (message.toLowerCase().includes('pain') || message.toLowerCase().includes('hurt')) {
             response = "I'm sorry to hear you're in pain. Based on your description, this could be a tension headache. Would you like me to suggest some remedies?";
         } else if (message.toLowerCase().includes('medicine') || message.toLowerCase().includes('medication')) {
             response = "For headache relief, over-the-counter options include ibuprofen, acetaminophen, or aspirin. Always consult with your doctor before starting any medication regimen.";
         } else if (message.toLowerCase().includes('trigger')) {
             response = "Common headache triggers include stress, dehydration, lack of sleep, certain foods like aged cheese or processed meats, alcohol, and caffeine. Would you like to track these in the app?";
         } else {
             response = "I'm here to help with your headache concerns. You can ask me about symptoms, treatments, or how to track potential triggers.";
         }
         addMessage('bot', response);
         
         // Auto scroll to bottom
         chatMessages.scrollTop = chatMessages.scrollHeight;
     }, 1000);
 }
 
 function addMessage(sender, text) {
     const messageDiv = document.createElement('div');
     messageDiv.className = `chat-message ${sender}`;
     
     const bubble = document.createElement('div');
     bubble.className = 'message-bubble';
     bubble.textContent = text;
     
     messageDiv.appendChild(bubble);
     chatMessages.appendChild(messageDiv);
 }
 
 // Trigger form toggle
 const newTriggerBtn = document.getElementById('new-trigger-btn');
 const triggerForm = document.getElementById('trigger-form');
 
 newTriggerBtn.addEventListener('click', () => {
     triggerForm.classList.toggle('active');
     newTriggerBtn.textContent = triggerForm.classList.contains('active') ? 
         'Cancel' : 'Record New Headache Episode';
 });
 
 // Trigger tags
 const triggerTags = document.querySelectorAll('.trigger-tag');
 
 triggerTags.forEach(tag => {
     tag.addEventListener('click', () => {
         tag.classList.toggle('active');
     });
 });
 
 // Toggle switches
 const toggleSwitches = document.querySelectorAll('.toggle-switch');
 
 toggleSwitches.forEach(toggle => {
     toggle.addEventListener('click', () => {
         toggle.classList.toggle('active');
     });
 });
 
 // Classification button
 const classifyBtn = document.getElementById('classify-btn');
 const classificationResult = document.getElementById('classification-result');
 
 classifyBtn.addEventListener('click', () => {
     // Show loading state
     classifyBtn.textContent = 'Analyzing...';
     classifyBtn.disabled = true;
     
     // Simulate AI processing
     setTimeout(() => {
         classificationResult.style.display = 'block';
         classifyBtn.textContent = 'Classify My Headache';
         classifyBtn.disabled = false;
         
         // Scroll to result
         classificationResult.scrollIntoView({ behavior: 'smooth' });
     }, 2000);
 });
 
 // Camera and voice analysis buttons
 const cameraBtn = document.querySelector('#monitor .action-button');
 const cameraResult = document.getElementById('camera-result');
 
 cameraBtn.addEventListener('click', () => {
     // Show loading state
     cameraBtn.textContent = 'Analyzing...';
     cameraBtn.disabled = true;
     
     // Simulate AI processing
     setTimeout(() => {
         cameraResult.style.display = 'block';
         cameraBtn.textContent = 'Activate Camera Analysis';
         cameraBtn.disabled = false;
         
         // Scroll to result
         cameraResult.scrollIntoView({ behavior: 'smooth' });
     }, 3000);
 });
 
 const voiceBtn = document.querySelector('#monitor .action-button:nth-of-type(2)');
 const voiceResult = document.getElementById('voice-result');
 
 voiceBtn.addEventListener('click', () => {
     // Show loading state
     voiceBtn.textContent = 'Listening...';
     voiceBtn.disabled = true;
     
     // Simulate AI processing
     setTimeout(() => {
         voiceResult.style.display = 'block';
         voiceBtn.textContent = 'Start Voice Analysis';
         voiceBtn.disabled = false;
         
         // Scroll to result
         voiceResult.scrollIntoView({ behavior: 'smooth' });
     }, 3000);
 });
 
 // Simulate real-time data for pain monitoring
 function simulateBioData() {
     // Only update if on the monitor tab
     if (document.getElementById('monitor').classList.contains('active')) {
         // Simulate fluctuating pain level based on current selection
         const fluctuation = Math.random() > 0.5 ? 1 : -1;
         let newPain = currentPain + fluctuation;
         
         // Keep within bounds
         if (newPain < 0) newPain = 0;
         if (newPain > 10) newPain = 10;
         
         // Only update occasionally to simulate detection
         if (Math.random() > 0.7) {
             painFill.style.width = `${newPain * 10}%`;
             painValue.textContent = newPain;
             
             // Update active button
             painButtons.forEach(btn => {
                 btn.classList.remove('active');
                 if (parseInt(btn.dataset.value) === Math.floor(newPain)) {
                     btn.classList.add('active');
                 }
             });
         }
     }
 }
 
 // Periodically check for new device data
 function checkDeviceData() {
     // Simulate occasional device notifications
     if (Math.random() > 0.9) {
         const types = [
             'elevated heart rate detected',
             'sleep quality decreased',
             'activity level below target',
             'environmental stress factors detected'
         ];
         
         const randomType = types[Math.floor(Math.random() * types.length)];
         
         // Create notification
         const notification = document.createElement('div');
         notification.className = 'notification';
         notification.innerHTML = `
             <div style="position: fixed; bottom: 20px; right: 20px; background-color: #4776e6; color: white; padding: 15px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.2); z-index: 1000; animation: slideIn 0.3s;">
                 <div style="font-weight: bold; margin-bottom: 5px;">Device Alert</div>
                 <div>Wearable device: ${randomType}</div>
             </div>
         `;
         
         document.body.appendChild(notification);
         
         // Remove after a few seconds
         setTimeout(() => {
             notification.remove();
         }, 5000);
     }
 }
 
 // Add animation keyframes
 const style = document.createElement('style');
 style.innerHTML = `
     @keyframes slideIn {
         from { transform: translateX(100%); opacity: 0; }
         to { transform: translateX(0); opacity: 1; }
     }
 `;
 document.head.appendChild(style);
 
 // Start simulations
 setInterval(simulateBioData, 5000);
 setInterval(checkDeviceData, 20000);
 
 // AI Analysis updates
 function updateAIInsights() {
     // Simulate AI generated insights based on accumulated data
     if (Math.random() > 0.8) {
         const insightList = document.querySelector('.insight-list');
         if (!insightList) return;
         
         const insights = [
             {
                 title: 'Sleep Pattern Correlation',
                 content: 'Your headaches are 65% more likely to occur after nights with less than 6 hours of sleep.'
             },
             {
                 title: 'Environmental Factor',
                 content: 'There is a notable correlation between decreased barometric pressure and your headache occurrences.'
             },
             {
                 title: 'Stress Response',
                 content: 'Elevated heart rate has been detected 1-2 hours before headache onset in 70% of cases.'
             },
             {
                 title: 'Dietary Pattern',
                 content: 'Consuming caffeine after 3pm appears to increase your likelihood of evening headaches.'
             }
         ];
         
         const randomInsight = insights[Math.floor(Math.random() * insights.length)];
         
         // Create new insight element
         const insightElement = document.createElement('div');
         insightElement.className = 'insight-item';
         insightElement.innerHTML = `
             <div class="insight-title">${randomInsight.title}</div>
             <p>${randomInsight.content}</p>
         `;
         
         // Add with animation
         insightElement.style.opacity = '0';
         insightElement.style.transform = 'translateY(20px)';
         insightElement.style.transition = 'all 0.5s ease';
         
         insightList.prepend(insightElement);
         
         // Trigger animation
         setTimeout(() => {
             insightElement.style.opacity = '1';
             insightElement.style.transform = 'translateY(0)';
         }, 100);
         
         // Remove oldest if too many
         const insightItems = insightList.querySelectorAll('.insight-item');
         if (insightItems.length > 5) {
             insightItems[insightItems.length - 1].remove();
         }
     }
 }
 
 // Start AI analysis updates
 setInterval(updateAIInsights, 30000);
 
 // Emergency button
 const emergencyBtn = document.querySelector('.emergency-btn');
 
 emergencyBtn.addEventListener('click', () => {
     // Show emergency modal
     const modal = document.createElement('div');
     modal.style.position = 'fixed';
     modal.style.top = '0';
     modal.style.left = '0';
     modal.style.width = '100%';
     modal.style.height = '100%';
     modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
     modal.style.display = 'flex';
     modal.style.justifyContent = 'center';
     modal.style.alignItems = 'center';
     modal.style.zIndex = '1000';
     
     modal.innerHTML = `
         <div style="background-color: white; padding: 20px; border-radius: 8px; width: 90%; max-width: 500px;">
             <h2 style="color: #ff4757; margin-bottom: 15px;">Emergency Resources</h2>
             <p style="margin-bottom: 15px;">If you're experiencing a medical emergency, please call emergency services immediately.</p>
             <div style="margin-bottom: 15px;">
                 <button style="background-color: #ff4757; color: white; border: none; padding: 10px 15px; border-radius: 5px; width: 100%; margin-bottom: 10px;">Call Emergency Services</button>
                 <button style="background-color: #4776e6; color: white; border: none; padding: 10px 15px; border-radius: 5px; width: 100%; margin-bottom: 10px;">Find Nearest ER</button>
                 <button style="background-color: #4776e6; color: white; border: none; padding: 10px 15px; border-radius: 5px; width: 100%;">Connect to Telemedicine Now</button>
             </div>
             <div>
                 <h3 style="margin-bottom: 10px;">Warning Signs - Seek Immediate Help If:</h3>
                 <ul style="margin-left: 20px;">
                     <li>Sudden, severe headache unlike any previous experience</li>
                     <li>Headache with fever, stiff neck, confusion</li>
                     <li>Headache after head injury</li>
                     <li>Headache with vision changes, weakness, or numbness</li>
                 </ul>
             </div>
             <button id="close-modal" style="background-color: #eee; border: none; padding: 10px 15px; border-radius: 5px; width: 100%; margin-top: 15px;">Close</button>
         </div>
     `;
     
     document.body.appendChild(modal);
     
     // Close button functionality
     document.getElementById('close-modal').addEventListener('click', () => {
         modal.remove();
     });
 });
 
 // Initialize with first-time user experience
 function initializeApp() {
     // Show welcome tour for first time users
     if (!localStorage.getItem('hasSeenTour')) {
         setTimeout(() => {
             const tour = document.createElement('div');
             tour.style.position = 'fixed';
             tour.style.top = '0';
             tour.style.left = '0';
             tour.style.width = '100%';
             tour.style.height = '100%';
             tour.style.backgroundColor = 'rgba(0,0,0,0.7)';
             tour.style.display = 'flex';
             tour.style.justifyContent = 'center';
             tour.style.alignItems = 'center';
             tour.style.zIndex = '1000';
             
             tour.innerHTML = `
                 <div style="background-color: white; padding: 20px; border-radius: 8px; width: 90%; max-width: 500px; text-align: center;">
                     <h2 style="color: #4776e6; margin-bottom: 15px;">Welcome to HeadacheAssist</h2>
                     <p style="margin-bottom: 20px;">Your AI-powered headache tracking and management system</p>
                     
                     <div style="margin-bottom: 20px;">
                         <img src="/api/placeholder/400/200" alt="App overview" style="width: 100%; border-radius: 8px;">
                     </div>
                     
                     <p style="margin-bottom: 20px;">HeadacheAssist uses AI to help you:</p>
                     <ul style="text-align: left; margin-bottom: 20px; margin-left: 20px;">
                         <li>Track and classify your headaches</li>
                         <li>Identify personal triggers</li>
                         <li>Get personalized treatment suggestions</li>
                         <li>Monitor pain levels in real-time</li>
                         <li>Connect with medical professionals when needed</li>
                     </ul>
                     
                     <p style="margin-bottom: 20px; font-style: italic;">Would you like a quick tour of the app?</p>
                     
                     <div style="display: flex; gap: 10px;">
                         <button id="start-tour" style="flex: 1; background-color: #4776e6; color: white; border: none; padding: 10px; border-radius: 5px;">Yes, show me around</button>
                         <button id="skip-tour" style="flex: 1; background-color: #eee; border: none; padding: 10px; border-radius: 5px;">Skip tour</button>
                     </div>
                 </div>
             `;
             
             document.body.appendChild(tour);
             
             // Tour buttons
             document.getElementById('start-tour').addEventListener('click', () => {
                 tour.remove();
                 startGuidedTour();
                 localStorage.setItem('hasSeenTour', 'true');
             });
             
             document.getElementById('skip-tour').addEventListener('click', () => {
                 tour.remove();
                 localStorage.setItem('hasSeenTour', 'true');
             });
         }, 1000);
     }
 }
 
 function startGuidedTour() {
     const tourSteps = [
         {
             element: '#dashboard',
             title: 'Dashboard',
             description: 'Your home base with current pain levels and AI insights about your headache patterns.'
         },
         {
             element: '#chatbot',
             title: 'AI Chatbot',
             description: 'Ask questions about your headaches and get personalized guidance from our AI assistant.'
         },
         {
             element: '#tracking',
             title: 'Trigger Tracking',
             description: 'Log your headaches and potential triggers to help the AI identify patterns specific to you.'
         },
         {
             element: '#monitor',
             title: 'Pain Monitoring',
             description: 'Advanced features that use your camera and microphone to detect pain levels in real-time.'
         },
         {
             element: '#devices',
             title: 'Device Integration',
             description: 'Connect your wearable devices for proactive monitoring and alerts.'
         },
         {
             element: '#treatment',
             title: 'Treatment Suggestions',
             description: 'Get personalized medication and natural remedy recommendations based on your headache profile.'
         }
     ];
     
     let currentStep = 0;
     
     function showTourStep(step) {
         // Find the element to highlight
         const element = document.querySelector(tourSteps[step].element);
         if (!element) return;
         
         // Show this tab first
         const tabId = tourSteps[step].element.replace('#', '');
         tabs.forEach(tab => {
             if (tab.dataset.tab === tabId) {
                 tab.click();
             }
         });
         
         // Create highlight overlay
         const highlight = document.createElement('div');
         highlight.className = 'tour-highlight';
         highlight.style.position = 'fixed';
         highlight.style.top = '0';
         highlight.style.left = '0';
         highlight.style.width = '100%';
         highlight.style.height = '100%';
         highlight.style.backgroundColor = 'rgba(0,0,0,0.7)';
         highlight.style.zIndex = '999';
         highlight.style.pointerEvents = 'none';
         
         document.body.appendChild(highlight);
         
         // Create tooltip
         const tooltip = document.createElement('div');
         tooltip.className = 'tour-tooltip';
         tooltip.style.position = 'fixed';
         tooltip.style.bottom = '20px';
         tooltip.style.left = '50%';
         tooltip.style.transform = 'translateX(-50%)';
         tooltip.style.backgroundColor = 'white';
         tooltip.style.padding = '15px';
         tooltip.style.borderRadius = '8px';
         tooltip.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
         tooltip.style.zIndex = '1000';
         tooltip.style.width = '90%';
         tooltip.style.maxWidth = '400px';
         
         tooltip.innerHTML = `
             <h3 style="color: #4776e6; margin-bottom: 10px;">${tourSteps[step].title}</h3>
             <p style="margin-bottom: 15px;">${tourSteps[step].description}</p>
             <div style="display: flex; justify-content: space-between;">
                 <button id="prev-step" ${step === 0 ? 'disabled' : ''} style="background-color: ${step === 0 ? '#eee' : '#4776e6'}; color: ${step === 0 ? '#999' : 'white'}; border: none; padding: 8px 15px; border-radius: 5px;">Previous</button>
                 <button id="next-step" style="background-color: #4776e6; color: white; border: none; padding: 8px 15px; border-radius: 5px;">${step === tourSteps.length - 1 ? 'Finish Tour' : 'Next'}</button>
             </div>
         `;
         
         document.body.appendChild(tooltip);
         
         // Add event listeners
         document.getElementById('prev-step').addEventListener('click', () => {
             if (currentStep > 0) {
                 highlight.remove();
                 tooltip.remove();
                 currentStep--;
                 showTourStep(currentStep);
             }
         });
         
         document.getElementById('next-step').addEventListener('click', () => {
             highlight.remove();
             tooltip.remove();
             
             if (currentStep < tourSteps.length - 1) {
                 currentStep++;
                 showTourStep(currentStep);
             }
         });
     }
     
     // Start the tour
     showTourStep(currentStep);
 }
 
 // Initialize the app
 initializeApp();
