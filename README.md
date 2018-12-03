##Usage

```
<body>
    <div style="height: 100%">
      <kyc-widget reference="12345678" id="widget1" @closed="closeCB"> </kyc-widget>
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
  <script src="https://github.com/palinda/kyc-web-widget/blob/master/dist/kyc-widget.app.js" type="text/javascript"></script>
```
