# maternal_mortality_narrative
Final project for Information Visualization (CS465): Narrative visualization project detailing racial disparities in maternal mortality in the United States. Created with D3.

-  To launch, either:
    1) Visit http://www.cs.middlebury.edu/~cbintz/infovis/final_project/hw9.html
    2) Download all files in repository into a directory and CD into the directory. In the terminal, run python -m http.server to run a local server. Next, open Chrome and enter “http://localhost:8000/hw9.html” into the address bar. 
    
    Files in repository: 
    -  apercu-light.ttf: font file for page

    -  create_map.js: javascript file containing function to create U.S. map colored by infant mortality rate

    -  create_why_chart.js: javascript file containing function to create the three horizontal bar charts (allostatic load scores, preeclampsia/eclampsia prevalence, and reports of discriminatory treatment)

    -  fatality_and_education.js: javascript file containing function to create bar chart showing maternal education attainment and infant mortality rate

    -  graph-scroll.js: D3 plugin to allow for our page’s scroll design

    -  hw9.html: main file that stylizes tooltips, headings, and text and also calls appropriate graphs to have opacity of 1 or zero or be hidden/not hidden according to current section

    -  infant_mortality_per_race.csv: dataset for map showing infant mortality rate. Source: Kaiser Family Foundation: https://www.kff.org/other/state-indicator/infant-mortality-rate-by-race-ethnicity/?currentTimeframe=0&sortModel=%7B%22colId%22:%22Location%22,%22sort%22:%22asc%22%7D

    -  infant_transpose.csv: transposed version of infant_mortality_per_race.csv, used to change map metric (race). Source: Kaiser Family Foundation https://www.kff.org/other/state-indicator/infant-mortality-rate-by-race-ethnicity/?currentTimeframe=0&sortModel=%7B%22colId%22:%22Location%22,%22sort%22:%22asc%22%7D

    -  lancet_data.csv: dataset of maternal mortality rate per country, used to create line graph. Source: The Lancet: https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(16)31470-2/fulltext

    -  line_chart.js: javascript file containing function to create line graph showing trends in maternal mortality over time for 29 top developed countries

    -  us-states.json: json file to create U.S. map

    -  us_bar_chart.js: javascript file containing function to create map showing infant mortality per state

    -  us_per_race_mmr.csv: dataset used to create horizontal bar chart showing maternal mortality rate per race. Source: Obstetrics & Gynecology https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5400697/
