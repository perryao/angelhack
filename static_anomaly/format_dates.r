library("lubridate")
library("tools")

ROOT_PATH <- "/home/will/PG/dat/Making/2017/"
columns <- c("DateTime","A (kg/hr)","B (kg/hr)","C (kg/hr)","D (kg/hr)","E (kg/hr)","F (kg/hr)","G (kg/hr)","H (kg/hr)","I (kg/hr)",
             "J (kg/hr)","K (kg/hr)","L (kg/hr)","M (kg/hr)","N (kg/hr)","O (kg/hr)","P (kg/hr)","Q (kg/hr)","R (kg/hr)","S (kg/hr)",
             "T (lbs/min)","U (lbs/min)","V (lbs/min)","W (lbs/min)","X (lbs/min)","Y (lbs/min)","Tank 1 (F)","Tank 2 (F)","Tank 3 (F)",
             "Tank 4 (F)","Tank 5 ( C )","Tank 6 (F)","Tank 7 (F)")

file.names <- dir(ROOT_PATH, pattern =".csv")

for(i in 1:length(file.names)){
  dat <-read.csv(paste(ROOT_PATH, file.names[i], sep=""))
  dat$DateTime <- as.numeric(as.POSIXct(mdy_hms(dat$DateTime)))
  out.file = paste(ROOT_PATH, paste(file_path_sans_ext(file.names[i]), "-update", ".csv", sep = ""), sep = "")
  colnames(dat) <- newnames
  write.table(dat, file=out.file, quote=FALSE, col.names = columns, row.names=FALSE, sep = ", ")
}

dat <-read.csv(paste(ROOT_PATH, "Frebruary.csv", sep=""))
dat$DateTime <- as.numeric(as.POSIXct(mdy_hms(dat$DateTime)))
out.file = paste(ROOT_PATH, paste(file_path_sans_ext("February", "-update", ".csv", sep = ""), sep = ""))
colnames(dat) <- newnames
write.table(dat, file=out.file, quote=FALSE, col.names = columns, row.names=FALSE, sep = ", ")