ps -elf | grep feh | awk '{print $4}' | while read line; do kill $line; done
