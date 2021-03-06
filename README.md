## Usage

1. Include `https://s3.amazonaws.com/ust-kyc-public/kyc-widget.app.js`
2. Define component as below. 
```
<kyc-widget reference="12345678"> </kyc-widget>
```

## Props

- reference : Unique reference id for this verification request.

## Events

- closed : Trigger after process completion

## Example

```
<body>
    <div style="height: 100%">
      <kyc-widget reference="12345678"> </kyc-widget>
   </div>
   
  </body>
  <script>
      document.getElementsByTagName('kyc-widget')[0].addEventListener('closed', (event) => {
        console.log('Closed: ' + event);
      })
      var closeCB = () => {
        console.log('Closed');
      }
    </script>
  <script src="https://s3.amazonaws.com/ust-kyc-public/kyc-widget.app.js" type="text/javascript"></script>
```
