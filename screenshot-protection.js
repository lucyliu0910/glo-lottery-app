// Screenshot & Screen Recording Protection
// 5-Layer Security System for Lucy Liu GLO Lottery App

(function() {
    'use strict';
    
    // ======================
    // LAYER 1: FLAG_SECURE (For Native App)
    // ======================
    // This will be applied during APK conversion
    // Adds FLAG_SECURE to prevent screenshots at OS level
    
    // ======================
    // LAYER 2: Dynamic Watermark
    // ======================
    function createWatermark() {
        // Get user info from session/login
        const customerId = sessionStorage.getItem('customerId') || 'VISITOR';
        const timestamp = new Date().toLocaleString();
        
        // Create watermark overlay
        const watermark = document.createElement('div');
        watermark.id = 'security-watermark';
        watermark.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 999999;
            background: repeating-linear-gradient(
                45deg,
                transparent,
                transparent 200px,
                rgba(25, 118, 210, 0.03) 200px,
                rgba(25, 118, 210, 0.03) 400px
            );
        `;
        
        // Add watermark text (customer ID + timestamp)
        const text = document.createElement('div');
        text.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-size: 48px;
            font-weight: 700;
            color: rgba(25, 118, 210, 0.08);
            white-space: nowrap;
            user-select: none;
            pointer-events: none;
            font-family: monospace;
        `;
        text.textContent = `${customerId} • ${timestamp} • CONFIDENTIAL`;
        
        watermark.appendChild(text);
        document.body.appendChild(watermark);
    }
    
    // ======================
    // LAYER 3: Screenshot Detection
    // ======================
    let screenshotAttempts = 0;
    
    function detectScreenshot() {
        // Detect visibility change (common during screenshot)
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                screenshotAttempts++;
                logSecurityEvent('SCREENSHOT_ATTEMPT', {
                    attempts: screenshotAttempts,
                    timestamp: new Date().toISOString()
                });
                
                // Show warning after 3 attempts
                if (screenshotAttempts >= 3) {
                    alert('⚠️ WARNING: Screenshots are strictly prohibited!\n\nThis activity has been logged and reported to admin.\n\nContinued violation may result in account suspension.');
                }
            }
        });
        
        // Detect user leaving/returning (screenshot indicator)
        let lastBlur = 0;
        window.addEventListener('blur', function() {
            lastBlur = Date.now();
        });
        
        window.addEventListener('focus', function() {
            const blurDuration = Date.now() - lastBlur;
            // Quick blur/focus = likely screenshot
            if (blurDuration < 1000 && blurDuration > 0) {
                logSecurityEvent('POSSIBLE_SCREENSHOT', {
                    duration: blurDuration
                });
            }
        });
    }
    
    // ======================
    // LAYER 4: Screen Recording Detection & Block
    // ======================
    function blockScreenRecording() {
        // Detect screen recording API
        if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
            const originalGetDisplayMedia = navigator.mediaDevices.getDisplayMedia;
            
            navigator.mediaDevices.getDisplayMedia = function() {
                logSecurityEvent('SCREEN_RECORDING_BLOCKED', {
                    timestamp: new Date().toISOString()
                });
                
                alert('🚫 Screen Recording Not Allowed\n\nScreen recording is strictly prohibited in this app for security reasons.');
                
                return Promise.reject(new Error('Screen recording is not allowed'));
            };
        }
        
        // Detect getUserMedia (camera/screen capture)
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            const originalGetUserMedia = navigator.mediaDevices.getUserMedia;
            
            navigator.mediaDevices.getUserMedia = function(constraints) {
                if (constraints.video && constraints.video.displaySurface) {
                    logSecurityEvent('SCREEN_CAPTURE_BLOCKED', {
                        timestamp: new Date().toISOString()
                    });
                    return Promise.reject(new Error('Screen capture is not allowed'));
                }
                return originalGetUserMedia.call(this, constraints);
            };
        }
    }
    
    // ======================
    // LAYER 5: Warning Messages
    // ======================
    function showSecurityWarning() {
        // Only show once per session
        if (sessionStorage.getItem('securityWarningShown')) {
            return;
        }
        
        // Create custom warning overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            z-index: 9999999;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Prompt', Arial, sans-serif;
        `;
        
        const warning = document.createElement('div');
        warning.style.cssText = `
            background: white;
            padding: 40px;
            border-radius: 20px;
            max-width: 500px;
            text-align: center;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        `;
        
        warning.innerHTML = `
            <div style="font-size: 64px; margin-bottom: 20px;">⚠️</div>
            <h2 style="color: #d32f2f; font-size: 24px; margin-bottom: 20px; font-weight: 700;">
                SECURITY WARNING
            </h2>
            <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">
                <strong>Screenshots and screen recording are strictly prohibited.</strong>
            </p>
            <p style="font-size: 14px; line-height: 1.6; color: #666; margin-bottom: 30px;">
                • All activities are monitored and logged<br>
                • Violations will be reported to admin<br>
                • Legal action may be taken<br>
                • Account may be suspended
            </p>
            <button id="acceptWarning" style="
                background: #1976d2;
                color: white;
                border: none;
                padding: 15px 40px;
                border-radius: 10px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                font-family: 'Prompt', Arial, sans-serif;
            ">
                I Understand
            </button>
        `;
        
        overlay.appendChild(warning);
        document.body.appendChild(overlay);
        
        document.getElementById('acceptWarning').addEventListener('click', function() {
            overlay.remove();
            sessionStorage.setItem('securityWarningShown', 'true');
        });
    }
    
    // ======================
    // Security Event Logging
    // ======================
    function logSecurityEvent(eventType, data) {
        // Log to Firebase
        if (typeof firebase !== 'undefined' && firebase.database) {
            const customerId = sessionStorage.getItem('customerId') || 'UNKNOWN';
            const logRef = firebase.database().ref('securityLogs/' + Date.now());
            
            logRef.set({
                eventType: eventType,
                customerId: customerId,
                userAgent: navigator.userAgent,
                timestamp: new Date().toISOString(),
                data: data
            }).catch(function(error) {
                console.error('Failed to log security event:', error);
            });
        }
        
        // Also log to console in development
        console.warn('[SECURITY]', eventType, data);
    }
    
    // ======================
    // Additional Protection
    // ======================
    function additionalProtection() {
        // Disable long-press context menu (3-finger screenshot trigger)
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            return false;
        });
        
        // Disable text selection (makes screenshot less useful)
        document.body.style.userSelect = 'none';
        document.body.style.webkitUserSelect = 'none';
        document.body.style.mozUserSelect = 'none';
        document.body.style.msUserSelect = 'none';
        
        // Detect developer tools (potential screenshot workaround)
        const devtools = /./;
        devtools.toString = function() {
            logSecurityEvent('DEVTOOLS_DETECTED', {
                timestamp: new Date().toISOString()
            });
        };
        console.log('%c', devtools);
        
        // Blur sensitive content when window loses focus
        window.addEventListener('blur', function() {
            document.body.style.filter = 'blur(10px)';
        });
        
        window.addEventListener('focus', function() {
            document.body.style.filter = 'none';
        });
    }
    
    // ======================
    // Initialize All Layers
    // ======================
    function initSecurity() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                initSecurity();
            });
            return;
        }
        
        // Show warning first
        setTimeout(showSecurityWarning, 1000);
        
        // Enable all protection layers
        createWatermark();
        detectScreenshot();
        blockScreenRecording();
        additionalProtection();
        
        // Log security system activation
        logSecurityEvent('SECURITY_SYSTEM_ACTIVATED', {
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString()
        });
        
        console.log('%c🔒 Security System Active', 'color: #1976d2; font-size: 16px; font-weight: bold;');
    }
    
    // Start protection
    initSecurity();
    
})();
