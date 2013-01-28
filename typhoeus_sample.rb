
#require File.dirname(__FILE__) + '/../lib/typhoeus.rb'
require 'typhoeus' 
hydra = Typhoeus::Hydra.new
p hydra
#hydra.disable_memoization

urls = [
    'http://google.com',
    'http://testphp.vulnweb.com',
    'http://demo.testfire.net',
    'http://example.net',
]

10.times {
    |i|

    req = Typhoeus::Request.new( urls[ i % urls.size] )
    p "==============================#{req.inspect}================="
	
    req.on_complete {
        |res|
        p "response is =====================#{res.inspect}"
        puts 'URL: ' + res.effective_url
        puts 'Time: ' + res.time.to_s
        puts 'Connect time: ' + res.connect_time.to_s
        puts 'App connect time: ' + res.app_connect_time.to_s
        puts 'Start transfer time: ' + res.start_transfer_time.to_s
        puts 'Pre transfer time: ' + res.pretransfer_time.to_s
        puts '-------------'
    }

    hydra.queue( req )
    puts 'Queued: ' + req.url
}

puts
puts 'Harvesting responses...'
puts

hydra.run

puts
puts 'Done.'
puts



















