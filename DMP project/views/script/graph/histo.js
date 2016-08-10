  //Canvas1
  var idd = [];
  var OldVolume = [];
  var NewVolume = [];

  List = [];
  function loaddatahist(List)
  {
      idd = [];
      OldVolume = [];
      NewVolume = [];
      //browse all element in the arraylist and attribute respective id, oldVol and newVol
      for (var i = 0; i< List.length; i++)
      {
        idd.push(List[i][0]);
        OldVolume.push(parseInt(List[i][2]));
        NewVolume.push(parseInt(List[i][3]));
      }

      createHist(idd, OldVolume, NewVolume);

  }



  var barChartData;
  function createHist(idd, OldVolume, NewVolume)
  {
        //intialize the histogramme canvas
        var ctx = document.getElementById("canvas").getContext("2d");
        //defined histogramme content
        barChartData =
        {
            labels: idd,
            datasets:
            [
              {
                label: 'Old Volume',
                backgroundColor: "blue",
                data: OldVolume
              },
              {
                label: 'New Volume',
                backgroundColor: "green",
                data: NewVolume
              }
            ]
        };

        //define histogramme parameter
        window.myBar = new Chart(ctx, {
            type: 'bar',
            data: barChartData,
            options: {
                elements: {
                    rectangle: {
                        borderWidth: 2,
                        //borderColor: 'rgb(0, 255, 0)',
                        borderSkipped: 'bottom'
                    }
                },
                responsive: true,
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Volume evolution'
                }
            }
        });

  }

  function loadIntent_Interest(List1)
  {
    $('#Intent_Interest_Data').click(function()
    {

      barChartData.datasets.splice(0, 2); //Remove previous dataset
      window.myBar.update();

      loaddatahist(List1); //load histogramme
      loadPieData(List1);

    });
  }

  function loadLifeStyle(List2)
  {
    $('#Lifestyle_Data').click(function()
    {

      barChartData.datasets.splice(0, 2); //Remove previous dataset
      window.myBar.update();

      loaddatahist(List2); //load histogramme
      loadPieData(List2);

    });
  }

  function loadBrand_Affinity(List3)
  {
    $('#Brand_affinity_Data').click(function()
    {

      barChartData.datasets.splice(0, 2); //Remove previous dataset
      window.myBar.update();

      loaddatahist(List3); //load histogramme
      loadPieData(List3);

    });
  }

  function loadDemographic_Insights(List4)
  {
    $('#Demographic_Insights_Data').click(function()
    {

      barChartData.datasets.splice(0, 2); //Remove previous dataset
      window.myBar.update();

      loaddatahist(List4); //load histogramme
      loadPieData(List4);

    });
  }

  function loadApp_Insights(List5)
  {
    $('#App_Insights_Data').click(function()
    {

      barChartData.datasets.splice(0, 2); //Remove previous dataset
      window.myBar.update();

      loaddatahist(List5); //load histogramme
      loadPieData(List5);

    });
  }
