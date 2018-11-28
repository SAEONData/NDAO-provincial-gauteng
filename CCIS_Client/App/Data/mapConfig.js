export const MapConfig = {
  service: "http://app01.saeon.ac.za/nccrdapi/odata/projects/extensions.geojson",
  toolTipField: "name",
  styleField: "status",
  styles: [
      {
          value: null,
          icon: "http://app01.saeon.ac.za/nccrd/yellow.png",
          anchorX: 8,
          anchorY: 8
      },
      {
          value: "ok",
          icon: "http://app01.saeon.ac.za/nccrd/green.png",
          anchorX: 8,
          anchorY: 8
      },
      {
          value: "bad",
          icon: "http://app01.saeon.ac.za/nccrd/red.png",
          anchorX: 8,
          anchorY: 8
      }
  ]
}