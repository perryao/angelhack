require "fastest-csv"
require "influxdb"
database = "plant_test"
name = "data"
tags = { plant: "1731" }
influxdb = InfluxDB::Client.new database, host: "thisisadangeroussite.com"
row_count = 0

FastestCSV.open("January-update.csv") do |csv|
  clean_fields = []
  fields = csv.shift
  fields.each do |field|
    clean_fields << field.gsub(/_/, ' ').split.join('_')
  end
  while values = csv.shift
    row_count += 1
    data_values = {}
    timestamp = ""
    values.each_with_index do |item, index|
      
      if clean_fields[index] == "datetime"
        timestamp = item
      elsif item == "(null)"
        item = 0
      else
        key = clean_fields[index].to_sym
        value = item.to_f
        data_values.merge!({key => value})
      end
    end
    # puts data_values
    data = {
      values: data_values, tags: tags, timestamp: timestamp
    }
    puts row_count
    influxdb.write_point(name, data)
  end
  #key = item[0].downcase.gsub(/[^\w\s\d]/, '').split.join('_').to_sym
  #puts value = item.delete(' ').to_f
  # values.merge!({key => value}) 
  puts "done"

end