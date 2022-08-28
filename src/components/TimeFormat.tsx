export const TimeFormat = ({ time }: any) => {
    const currentMinutes = Math.floor(time / 60);
    const minutes = currentMinutes < 10 ? '0' + currentMinutes.toString() : currentMinutes;

    const currentSeconds = Math.floor(time - currentMinutes * 60);
    const seconds = currentSeconds < 10 ? '0' + currentSeconds.toString() : currentSeconds;

    return <span>{`${minutes}:${seconds}`}</span>
}