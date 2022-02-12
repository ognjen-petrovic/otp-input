# Custom web component - OTP Input

### Reusable one time password/passcode web component for multi factor authentication (MFA)

[example](//ognjen-petrovic.github.io/otp-input/examples/index.html)

```html
<!DOCTYPE html>
<html>
<head>
    <script src="../otp-input.js"></script>
</head>
<body>

    <otp-input length="5" disabled></otp-input>
    
    <script>
        const otp = document.querySelector('otp-input')
        otp.disabled = false
        otp.addEventListener('change', function (e) {
            console.log('change...', e.target.filled, e.target.value)
        })
    </script>
    
</body>
</html>
```
