//Classes
function OldVolume(id, country, Vol) {
  this.id = id;
  this.country = country;
  this.Vol = Vol;
}

function NewVolume(id, country, Vol) {
  this.id = id;
  this.country = country;
  this.Vol = Vol;
}

function SUMOld(sum)
{
  this.sum = sum;
}

function SUM(sum)
{
  this.sum = sum;
}

function SUMVolCat(sum)
{
  this.sum = sum;
}



var readCSV = require('nodecsv').readCSV;
var path = "Volumes/old/volume/part-00000";
var path2 = "Volumes/new/volume/part-00000";
var pathtaxonomie = "CSV/Taxonomie.csv";
var path4 = "CSV/mapIsoCode.csv";



var ArrayList = require("arraylist");
var id = "";
var oldVol = "";
var newVol = "";

//for category reading
var cat_id = "";
var category = "";

var o; //old Volume class variable initialize
var n; //new Volume class variable initialize

var ListOldVolume = new ArrayList;
var ListDistinctOldid = new ArrayList;
var ListDistinctOld = new ArrayList;
var ListNewVolume = new ArrayList;
var ListDistinctNewid = new ArrayList;
var ListDistinctNew = new ArrayList;

var ListPreHisto = new ArrayList;
var ListTabTotal = new ArrayList;
var ListPreCategory = new ArrayList;
var ListCategoryId = new ArrayList;
var ListCategoryCategory = new ArrayList;
var ListCategory = new ArrayList;

var tabSum1 = [];
function AdSumOld(sum)
{
  var s = new SUMOld(sum);
  tabSum1.push([s.sum]);
}

var tabSum = [];
function AdSum(sum)
{
  var s = new SUM(sum);
  tabSum.push([s.sum]);
}

var tabSumVolCat = [];
function AdSumVolCat(sum)
{
  var s = new SUMVolCat(sum);
  tabSumVolCat.push([s.sum]);
}



module.exports =
{
  getobj:function Visu(callback)
  {
    readCSV(path, function(error, data) //load oldVolume file
    {
      ListOldVolume = []; //clear previous data
      ListDistinctOldid = [];
      ListDistinctOld = [];

      for(var i = 1; i < data.length; i++) // we don't get the first row
      {

        id = data[i][0];
        country = data[i][1];
        newVol = data[i][2];

        o = new NewVolume(id, country, newVol);
        ListOldVolume.push([o.id, o.country, o.Vol]);
      }


      var temp1 = [];
      var unique1 = [];

      for(var ya = 0; ya < ListOldVolume.length; ya++)
      {
        temp1[ListOldVolume[ya][0]] = true; //exclusion doublon
      }

      //get unique id
      for(var ka in temp1)
      {
        unique1.push(ka);
        unique1.sort();
      }

      var sum21 = 0;
      var tablast1 = [];
      for(var yoa = 0; yoa < unique1.length; yoa++)
      {
        for(var yooa = 0; yooa < ListOldVolume.length; yooa++)
        {
          if(ListOldVolume[yooa][0] == unique1[yoa])
          {
            sum21 += parseInt(ListOldVolume[yooa][2]);
          }
        }
        AdSumOld(sum21); //get volume of each id but already summed
      }

      //we need to have correct volume for each id
      var temp21 = [];
      var tabdef1 = [];

      //copy of tabSum in order to calcutate the correct volume
      for(var qa=0; qa < tabSum1.length; qa++)
      {
        temp21.push(tabSum1[qa]);
      }

      //exact volume
      for(var q1a=0; q1a < tabSum1.length; q1a++)
      {
        temp21[q1a] = parseInt(temp21[q1a]);

        if(q1a > 0) //exclude first row
        {
          temp21[q1a] = parseInt(temp21[q1a]) - parseInt(tabSum1[q1a-1]);
        }
      }

      //add list
      for(var fa=0; fa < unique1.length; fa++)
      {
        ListDistinctOld.push([unique1[fa], temp21[fa]]); //distinct old volume table (id, voltotal);
      }

      //Load New Volume
      readCSV(path2, function(error, data2)
      {
        ListNewVolume = [];
        ListDistinctNewid = [];
        ListDistinctNew = [];

        for(var x = 1; x < data2.length; x++) // we don't get the first row
        {

          id = data2[x][0];
          country = data2[x][1];
          newVol = data2[x][2];

          n = new NewVolume(id, country, newVol);
          ListNewVolume.push([n.id, n.country, n.Vol]);
        }


        var temp = [];
        var unique = [];

        for(var y = 0; y < ListNewVolume.length; y++)
        {
          temp[ListNewVolume[y][0]] = true; //exclusion doublon
        }

        //get unique id
        for(var k in temp)
        {
          unique.push(k);
          unique.sort();
        }

        var sum2 = 0;
        var tablast = [];
        for(var yo = 0; yo < unique.length; yo++)
        {
          for(var yoo = 0; yoo < ListNewVolume.length; yoo++)
          {
            if(ListNewVolume[yoo][0] == unique[yo])
            {
              sum2 += parseInt(ListNewVolume[yoo][2]);
            }
          }
          AdSum(sum2); //get volume of each id but already summed
        }

        //we need to have correct volume for each id
        var temp2 = [];
        var tabdef = [];

        //copy of tabSum in order to calcutate the correct volume
        for(var q=0; q < tabSum.length; q++)
        {
          temp2.push(tabSum[q]);
        }

        //exact volume
        for(var q1=0; q1 < tabSum.length; q1++)
        {
          temp2[q1] = parseInt(temp2[q1]);

          if(q1 > 0) //exclude first row
          {
            temp2[q1] = parseInt(temp2[q1]) - parseInt(tabSum[q1-1]);
          }
        }

        //add list
        for(var f=0; f < unique.length; f++)
        {
          ListDistinctNew.push([unique[f], temp2[f]]); //distinct new volume table (id, voltotal);
        }


        //Load Category
        ListCategory = [];
        var taxId = "";
        var cat = "";
        var datatype = "";

        //readCSV(path3, function(error, data3)
        readCSV(pathtaxonomie, function(error, data3)
        {
          for(var c = 1; c < data3.length; c++) //Retrieve categories
          {
            taxId = data3[c][0];
            cat = data3[c][1].split(">").pop();
            datatype = data3[c][1].split(">")[1];
            ListPreCategory.push([taxId, datatype, cat]); //add category_id, datatype and cat
          }

          ListPreHisto = [];
          //Retrieve category_id, old and new volume
          for(var k = 0; k < ListDistinctOld.length; k++)
          {
            for(var m = 0; m < ListDistinctNew.length; m++)
            {
              if(ListDistinctOld[k][0] == ListDistinctNew[m][0])
              {
                  ListPreHisto.push([ListDistinctOld[k][0], ListDistinctOld[k][1], ListDistinctNew[m][1]]); //Retrieve old and new volume for each category_ID
                  ListPreHisto.sort();
              }
            }
          }


          ListTabTotal = [];
          //Retrieve category_ID and category
          for(var f = 0; f < ListPreCategory.length; f++)
          {
              ListCategoryId.push(ListPreCategory[f][0]);
              ListCategoryCategory.push(ListPreCategory[f][2]);
              ListCategory.push([ListPreCategory[f][0], ListPreCategory[f][2], ListPreCategory[f][1]]); //List of distincted category_ID and category that will be used
          }

          //add difference for table
          for(var g = 0; g < ListCategory.length; g++)
          {
            for(var h = 0; h < ListPreHisto.length; h++)
            {
              if(ListCategory[g][0] == ListPreHisto[h][0])
              {
                  var diff = ListPreHisto[h][2] - ListPreHisto[h][1];
                  ListTabTotal.push([ListCategory[g][0], ListCategory[g][1], ListPreHisto[h][1], ListPreHisto[h][2], diff, ListCategory[g][2]]); //Retrieve category_ID, datatype, category, old Volume, New Volume
                  ListTabTotal.sort();
              }
            }
          }

          //console.log(ListTabTotal);

          //attribuate datavolume with their respective datatype
          var ListIntent_Interest = [];
          var ListLifeStyle = [];
          var ListBrandAffinity = [];
          var ListDemographic_Insights = [];
          var ListAppInsights = [];
          var ListPredatatype = [];

          //create a list to affect datatype to each data
          for(var c2 = 0; c2 < ListPreCategory.length; c2++)
          {
            for(var c3 = 0; c3 < ListTabTotal.length; c3++)
            {
              if(ListPreCategory[c2][0] == ListTabTotal[c3][0])
              {
                //List Pre-datatype : category_id, datatype, category, oldVolume, newVolume, difference
                ListPredatatype.push([ListTabTotal[c3][0], ListPreCategory[c2][1], ListTabTotal[c3][1], ListTabTotal[c3][2], ListTabTotal[c3][3], ListTabTotal[c3][4]]);
              }
            }
          }
          ListPredatatype.sort();

          //Insert data to their respective datatype table
          for(var k in ListPredatatype)
          {
            if(!ListPredatatype[k][1].indexOf(" Interest ") || !ListPredatatype[k][1].indexOf(" Certified Intenders "))
            {
              //category_id, datatype, category, oldVolume, newVolume
              ListIntent_Interest.push([ListPredatatype[k][0], ListPredatatype[k][1], ListPredatatype[k][2], ListPredatatype[k][3], ListPredatatype[k][4]]);
            }
            if(!ListPredatatype[k][1].indexOf(" Lifestyle Profiles "))
            {
              //category_id, datatype, category, oldVolume, newVolume
              ListLifeStyle.push([ListPredatatype[k][0], ListPredatatype[k][1], ListPredatatype[k][2], ListPredatatype[k][3], ListPredatatype[k][4]]);
            }
            if(!ListPredatatype[k][1].indexOf(" Brand Affinity "))
            {
              //category_id, datatype, category, oldVolume, newVolume
              ListBrandAffinity.push([ListPredatatype[k][0], ListPredatatype[k][1], ListPredatatype[k][2], ListPredatatype[k][3], ListPredatatype[k][4]]);
            }
            if(!ListPredatatype[k][1].indexOf(" Demographic Insights "))
            {
              //category_id, datatype, category, oldVolume, newVolume
              ListDemographic_Insights.push([ListPredatatype[k][0], ListPredatatype[k][1], ListPredatatype[k][2], ListPredatatype[k][3], ListPredatatype[k][4]]);
            }
            if(!ListPredatatype[k][1].indexOf(" App Ownership "))
            {
              //category_id, datatype, category, oldVolume, newVolume
              ListAppInsights.push([ListPredatatype[k][0], ListPredatatype[k][1], ListPredatatype[k][2], ListPredatatype[k][3], ListPredatatype[k][4]]);
            }
          }

          ListIntent_Interest.sort();
          ListLifeStyle.sort();
          ListBrandAffinity.sort();
          ListDemographic_Insights.sort();
          ListAppInsights.sort();

          //mapListISOcode
          ListMap = [];
          readCSV(path4, function(error, data4)
          {
            //console.log(ListNewVolume);
            for(var ma=0; ma < data4.length; ma++)
            {
              for(var na=0; na < ListNewVolume.length; na++)
              {
                if(ListNewVolume[na][1] == data4[ma][2])
                {
                  //console.log(ListNewVolume[na][0], data4[ma][1], ListNewVolume[na][2]);
                  ListMap.push([ListNewVolume[na][0], data4[ma][1], ListNewVolume[na][2]]);
                }
              }
            }


            var tempCat = [];
            var uniqueCat = [];
            ListVolCat = [];

            for(var listCa = 0; listCa < ListMap.length; listCa++)
            {
              tempCat[ListMap[listCa][1]] = true; //exclusion doublon
            }

            //get unique cat and copy it
            for(var k in tempCat)
            {
              uniqueCat.push(k);
              uniqueCat.sort();
            }

            var sumVolCat = 0;
            //var tablast = [];
            for(var yo = 0; yo < uniqueCat.length; yo++)
            {
              for(var yoo = 0; yoo < ListMap.length; yoo++)
              {
                if(ListMap[yoo][1] == uniqueCat[yo])
                {
                  sumVolCat += parseInt(ListMap[yoo][2]);
                }
              }
              AdSumVolCat(sumVolCat); //get volume of each id but already summed
            }

            //we need to have correct volume for each id
            var tempCat2 = [];
            var tabdefCat = [];

            //copy of tabSum in order to calcutate the correct volume
            for(var q=0; q < tabSumVolCat.length; q++)
            {
              tempCat2.push(tabSumVolCat[q]);
            }

            //exact volume
            for(var q1=0; q1 < tabSumVolCat.length; q1++)
            {
              tempCat2[q1] = parseInt(tempCat2[q1]);

              if(q1 > 0) //exclude first row
              {
                tempCat2[q1] = parseInt(tempCat2[q1]) - parseInt(tabSumVolCat[q1-1]);
              }
            }

            //add list
            for(var f=0; f < uniqueCat.length; f++)
            {
              ListVolCat.push([uniqueCat[f], tempCat2[f]]);
            }

            ListVolCat.sort();
            ListMap.sort();

            //console.log(ListVolCat.length);

            //console.log(ListMap);
            ListSend = [];
            ListSend.push([ListIntent_Interest], [ListLifeStyle], [ListBrandAffinity], [ListDemographic_Insights], [ListAppInsights], [ListTabTotal], [ListOldVolume], [ListNewVolume], [ListMap], [ListVolCat]);

            //console.log(ListDemographic_Insights);
            callback(null, ListSend);

          });



        });


      });

    });

  }
}
