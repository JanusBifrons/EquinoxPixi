import { Stats } from "@/game/objects/Stats";
import { useEffect, useState } from "react";
import GaugeComponent from "react-gauge-component";

export interface IShipStatsProps {
    stats: Stats;
}

export default function ShipStats(props: IShipStatsProps) {
    return (
        <div>
            <div className="absolute bottom-0 left-0 right-0 flex justify-center flex-row">
                <div className="">
                    <GaugeComponent
                        arc={{
                            subArcs: [
                                {
                                    limit: 100,
                                    color: 'green',
                                },
                            ]
                        }}
                        labels={{
                            valueLabel: {
                                hide: true
                            },
                            tickLabels: {
                                type: "inner"
                            }
                        }}
                        value={props.stats?.hullPercent ? props.stats.hullPercent : 0}
                    />
                </div>
                <div className="flex justify-start">
                    <GaugeComponent
                        arc={{
                            subArcs: [
                                {
                                    limit: 100,
                                    color: 'grey',
                                },
                            ]
                        }}
                        labels={{
                            valueLabel: {
                                hide: true
                            },
                            tickLabels: {
                                type: "inner"
                            }
                        }}
                        value={props.stats?.armourPercent ? props.stats.armourPercent : 0}
                    />
                </div>
                <div className="flex justify-center">
                    <GaugeComponent
                        arc={{
                            subArcs: [
                                {
                                    limit: 100,
                                    color: 'blue',
                                },
                            ],
                        }}
                        labels={{
                            valueLabel: {
                                hide: true
                            },
                            tickLabels: {
                                type: "inner"
                            }
                        }}
                        value={props.stats?.shieldPercent ? props.stats.shieldPercent : 0}
                    />
                </div>
                <div className="flex justify-center">
                    <GaugeComponent
                        arc={{
                            subArcs: [
                                {
                                    limit: 100,
                                    color: 'yellow',
                                },
                            ],
                        }}
                        labels={{
                            valueLabel: {
                                hide: true
                            },
                            tickLabels: {
                                type: "inner"
                            },
                        }}
                        value={props.stats?.powerPercent ? props.stats.powerPercent : 0}
                    />
                </div>
            </div>
        </div>

    );
}