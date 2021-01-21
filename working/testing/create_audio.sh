#!/usr/bin/env bash

# This script will create some test folders and audio items for dev/test work
# Change the numbers below - or don't...


echo Removing existing
rm -rf albums/
NUM_ARTISTS=5
NUM_ALBUMS=5
NUM_TRACKS=9
FREQ_START=500
FREQ_INC=46 #in honour of Joe

for artist in $(seq 1 $NUM_ARTISTS)
do
    artist_folder="Artist ${artist}"
    echo "Creating ${artist_folder}"
    for album in $(seq 1 $NUM_ALBUMS)
    do
        album_folder="${artist_folder}/${artist_folder} - Album ${album}"
        echo "Creating ${album_folder}"
        mkdir -p "albums/${album_folder}"
        for track in $(seq 1 $NUM_TRACKS)
        do
            let frequency=$(($FREQ_START+($FREQ_INC * $track)))
            track_file="albums/${album_folder}/Artist ${artist} - Album ${album} - Track ${track}.wav"
            echo ${track_file}
            ffmpeg -f lavfi -i "sine=frequency=${frequency}:duration=30" -ac 2 "albums/${album_folder}/Artist ${artist} - Album ${album} - Track ${track}.wav"
        done
    done
done

