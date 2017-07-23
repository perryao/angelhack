install.packages("httr")

library("httr")
library("lubridate")


complaints <- read.csv("/home/will/PG/dat/Complaints/complaints.csv")
januarary.2017 <- read.csv("/home/will/PG/dat/Making/2017/January-update.csv")
february.2017 <- read.csv("/home/will/PG/dat/Making/2017/February-update.csv")
march.2017 <- read.csv("/home/will/PG/dat/Making/2017/March-update.csv")
april.2017 <- read.csv("/home/will/PG/dat/Making/2017/April-update.csv")
may.2017 <- read.csv("/home/will/PG/dat/Making/2017/May-update.csv")

getDateFromCode <- function(prod_code) {
  year <- substring(prod_code, 1, 1)
  julian_day <- substring(prod_code, 2, 4)
  plant_code <- substring(prod_code, 5, 8)
  line_number <- substring(prod_code, 9, 10)
  hour <- substring(prod_code, 11, 12)
  minute <- substring(prod_code, 13 ,14)
  
  if (year == "6") {
    return(as.Date(paste("2016", julian_day, hour, minute, sep="-"), "%Y-%j-%H-%M"))
  }
}

complaints[complaints$State.Province == "MA", ]

complaint.corpus <- Corpus(VectorSource(complaints$Summary))
complaint.corpus >- tm_map(complaint.corpus, PlainTextDocument)

complaint.corpus <- tm_map(complaint.corpus, removePunctuation)
complaint.corpus <- tm_map(complaint.corpus, removeWords, stopwords('english'))
complaint.corpus <- tm_map(complaint.corpus, stemDocument)
